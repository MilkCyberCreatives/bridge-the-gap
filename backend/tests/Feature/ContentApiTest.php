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
        $this->getJson('/api/v1/health')
            ->assertOk()
            ->assertHeader('Cache-Control', 'no-store, max-age=0')
            ->assertJsonPath('service', 'bridge-the-gap-backend');
    }
}
