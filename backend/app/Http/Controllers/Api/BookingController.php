<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'fullName' => ['required', 'string', 'min:2', 'max:120'],
            'phone' => ['required', 'string', 'min:7', 'max:40'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'organisation' => ['nullable', 'string', 'max:160'],
            'audience' => ['required', 'string', 'max:120'],
            'service' => ['required', 'string', 'max:160'],
            'curriculum' => ['required', Rule::in(['CAPS', 'IB', 'CAPS and IB', 'Other'])],
            'preferredDate' => ['required', 'date_format:Y-m-d'],
            'preferredTime' => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'message' => ['required', 'string', 'min:3', 'max:4000'],
            'subjects' => ['present', 'array', 'max:40'],
            'subjects.*' => ['string', 'max:120'],
            'otherSubject' => ['nullable', 'string', 'max:160'],
            'utmSource' => ['nullable', 'string', 'max:120'],
            'utmMedium' => ['nullable', 'string', 'max:120'],
            'utmCampaign' => ['nullable', 'string', 'max:120'],
            'utmTerm' => ['nullable', 'string', 'max:120'],
            'utmContent' => ['nullable', 'string', 'max:120'],
            'landingPage' => ['nullable', 'string', 'max:240'],
            'referrer' => ['nullable', 'string', 'max:240'],
        ]);

        $idempotencyKey = trim((string) $request->header('Idempotency-Key', ''));
        if ($idempotencyKey !== '' && strlen($idempotencyKey) > 120) {
            return response()->json([
                'ok' => false,
                'message' => 'Invalid idempotency key.',
            ], 400);
        }

        $slotKey = $validated['preferredDate'].'|'.$validated['preferredTime'];

        return DB::transaction(function () use ($validated, $idempotencyKey, $slotKey): JsonResponse {
            if ($idempotencyKey !== '') {
                $existing = Booking::query()
                    ->where('idempotency_key', $idempotencyKey)
                    ->first();

                if ($existing) {
                    return $this->bookingResponse($existing, true);
                }
            }

            try {
                $booking = Booking::query()->create([
                    'public_id' => (string) Str::uuid(),
                    'idempotency_key' => $idempotencyKey !== '' ? $idempotencyKey : null,
                    'slot_key' => $slotKey,
                    'full_name' => trim($validated['fullName']),
                    'phone' => trim($validated['phone']),
                    'email' => mb_strtolower(trim($validated['email'])),
                    'organisation' => trim((string) ($validated['organisation'] ?? '')) ?: null,
                    'audience' => trim($validated['audience']),
                    'service' => trim($validated['service']),
                    'curriculum' => $validated['curriculum'],
                    'preferred_date' => $validated['preferredDate'],
                    'preferred_time' => $validated['preferredTime'],
                    'message' => trim($validated['message']),
                    'subjects' => array_values($validated['subjects']),
                    'other_subject' => trim((string) ($validated['otherSubject'] ?? '')) ?: null,
                    'attribution' => [
                        'utmSource' => $validated['utmSource'] ?? '',
                        'utmMedium' => $validated['utmMedium'] ?? '',
                        'utmCampaign' => $validated['utmCampaign'] ?? '',
                        'utmTerm' => $validated['utmTerm'] ?? '',
                        'utmContent' => $validated['utmContent'] ?? '',
                        'landingPage' => $validated['landingPage'] ?? '',
                        'referrer' => $validated['referrer'] ?? '',
                    ],
                    'status' => 'reserved',
                    'calendar_status' => 'pending',
                    'notification_status' => 'pending',
                ]);
            } catch (QueryException $exception) {
                if ($idempotencyKey !== '') {
                    $existing = Booking::query()
                        ->where('idempotency_key', $idempotencyKey)
                        ->first();

                    if ($existing) {
                        return $this->bookingResponse($existing, true);
                    }
                }

                if (Booking::query()->where('slot_key', $slotKey)->exists()) {
                    return response()->json([
                        'ok' => false,
                        'message' => 'The selected slot is no longer available.',
                    ], 409);
                }

                throw $exception;
            }

            return $this->bookingResponse($booking, false, 201);
        }, 3);
    }

    public function sync(Request $request, string $publicId): JsonResponse
    {
        $booking = Booking::query()->where('public_id', $publicId)->firstOrFail();

        $validated = $request->validate([
            'status' => ['nullable', Rule::in(['reserved', 'confirmed', 'failed', 'cancelled'])],
            'calendarStatus' => ['nullable', Rule::in(['pending', 'created', 'skipped', 'conflict', 'failed'])],
            'notificationStatus' => ['nullable', Rule::in(['pending', 'delivered', 'skipped', 'failed'])],
            'providerReference' => ['nullable', 'string', 'max:255'],
        ]);

        $nextStatus = $validated['status'] ?? null;

        $booking->fill(array_filter([
            'status' => $nextStatus,
            'calendar_status' => $validated['calendarStatus'] ?? null,
            'notification_status' => $validated['notificationStatus'] ?? null,
            'provider_reference' => $validated['providerReference'] ?? null,
        ], fn ($value) => $value !== null));

        if (in_array($nextStatus, ['failed', 'cancelled'], true)) {
            $booking->slot_key = null;
        }

        $booking->save();

        return response()->json([
            'ok' => true,
            'bookingId' => $booking->public_id,
        ])->header('Cache-Control', 'no-store, max-age=0');
    }

    private function bookingResponse(Booking $booking, bool $duplicate, int $status = 200): JsonResponse
    {
        return response()->json([
            'ok' => true,
            'bookingId' => $booking->public_id,
            'status' => $booking->status,
            'calendarStatus' => $booking->calendar_status,
            'notificationStatus' => $booking->notification_status,
            'duplicate' => $duplicate,
        ], $status)->header('Cache-Control', 'no-store, max-age=0');
    }
}
