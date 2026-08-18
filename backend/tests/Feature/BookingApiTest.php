<?php

namespace Tests\Feature;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingApiTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return [
            'fullName' => 'Test Learner',
            'phone' => '0842331687',
            'email' => 'learner@example.com',
            'organisation' => 'Test School',
            'audience' => 'Learner',
            'service' => 'Tutoring Services',
            'curriculum' => 'CAPS',
            'preferredDate' => '2026-08-20',
            'preferredTime' => '10:00',
            'message' => 'I need support with mathematics.',
            'subjects' => ['Mathematics'],
            'otherSubject' => '',
            ...$overrides,
        ];
    }

    public function test_idempotency_key_returns_the_same_booking(): void
    {
        $headers = ['Idempotency-Key' => 'booking-retry-1'];

        $first = $this->withHeaders($headers)->postJson('/api/v1/bookings', $this->payload());
        $second = $this->withHeaders($headers)->postJson('/api/v1/bookings', $this->payload());

        $first->assertCreated()->assertJsonPath('duplicate', false);
        $second->assertOk()->assertJsonPath('duplicate', true);

        $this->assertSame(
            $first->json('bookingId'),
            $second->json('bookingId'),
        );
        $this->assertDatabaseCount('bookings', 1);
    }

    public function test_only_one_booking_can_reserve_a_slot(): void
    {
        $this->withHeaders(['Idempotency-Key' => 'booking-a'])
            ->postJson('/api/v1/bookings', $this->payload())
            ->assertCreated();

        $this->withHeaders(['Idempotency-Key' => 'booking-b'])
            ->postJson('/api/v1/bookings', $this->payload(['email' => 'other@example.com']))
            ->assertStatus(409)
            ->assertJsonPath('ok', false);

        $this->assertDatabaseCount('bookings', 1);
    }

    public function test_provider_status_sync_requires_service_token(): void
    {
        $booking = Booking::query()->create([
            'public_id' => '11111111-1111-4111-8111-111111111111',
            'slot_key' => '2026-08-20|11:00',
            'full_name' => 'Test Learner',
            'phone' => '0842331687',
            'email' => 'learner@example.com',
            'audience' => 'Learner',
            'service' => 'Tutoring Services',
            'curriculum' => 'CAPS',
            'preferred_date' => '2026-08-20',
            'preferred_time' => '11:00',
            'message' => 'Test',
            'subjects' => ['Mathematics'],
            'status' => 'reserved',
            'calendar_status' => 'pending',
            'notification_status' => 'pending',
        ]);

        $this->patchJson("/api/v1/bookings/{$booking->public_id}/sync", [
            'status' => 'confirmed',
        ])->assertUnauthorized();

        $this->withToken('test-service-token')
            ->patchJson("/api/v1/bookings/{$booking->public_id}/sync", [
                'status' => 'confirmed',
                'calendarStatus' => 'created',
                'notificationStatus' => 'delivered',
            ])
            ->assertOk();

        $this->assertDatabaseHas('bookings', [
            'public_id' => $booking->public_id,
            'status' => 'confirmed',
            'calendar_status' => 'created',
            'notification_status' => 'delivered',
        ]);
    }

    public function test_failed_booking_releases_the_slot_for_a_new_request(): void
    {
        $first = $this->withHeaders(['Idempotency-Key' => 'booking-failed'])
            ->postJson('/api/v1/bookings', $this->payload(['preferredTime' => '12:00']))
            ->assertCreated();

        $bookingId = (string) $first->json('bookingId');

        $this->withToken('test-service-token')
            ->patchJson("/api/v1/bookings/{$bookingId}/sync", [
                'status' => 'failed',
                'calendarStatus' => 'failed',
                'notificationStatus' => 'failed',
            ])
            ->assertOk();

        $this->assertDatabaseHas('bookings', [
            'public_id' => $bookingId,
            'status' => 'failed',
            'slot_key' => null,
        ]);

        $this->withHeaders(['Idempotency-Key' => 'booking-after-failure'])
            ->postJson('/api/v1/bookings', $this->payload([
                'preferredTime' => '12:00',
                'email' => 'retry@example.com',
            ]))
            ->assertCreated();
    }
}
