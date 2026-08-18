<?php

namespace Tests\Feature;

use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_bootstrap_api_mirrors_seeded_frontend_content(): void
    {
        $this->seed(DatabaseSeeder::class);

        $response = $this->getJson('/api/v1/bootstrap');

        $response
            ->assertOk()
            ->assertJsonPath('ok', true)
            ->assertJsonCount(4, 'programmes')
            ->assertJsonCount(3, 'subjects')
            ->assertJsonCount(6, 'insights')
            ->assertJsonCount(5, 'faqs')
            ->assertJsonPath('programmes.0.slug', 'tutoring-services')
            ->assertJsonPath('subjects.0.slug', 'mathematics');
    }

    public function test_health_endpoint_is_private_from_cache(): void
    {
        $response = $this->getJson('/api/v1/health')
            ->assertOk()
            ->assertJsonPath('service', 'bridge-the-gap-backend');

        $cacheControl = (string) $response->headers->get('Cache-Control');

        $this->assertStringContainsString('no-store', $cacheControl);
        $this->assertStringContainsString('max-age=0', $cacheControl);
    }
}
