<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_admin')->default(false)->index();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table): void {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('programmes', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('short_title');
            $table->text('summary');
            $table->string('audience');
            $table->json('benefits');
            $table->json('focus_areas');
            $table->json('subject_lists');
            $table->string('image')->nullable();
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('tagline');
            $table->string('intro_title');
            $table->text('intro_text');
            $table->json('outcomes');
            $table->json('topics');
            $table->json('support');
            $table->json('faqs');
            $table->json('images');
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('insights', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('excerpt');
            $table->date('published_at');
            $table->unsignedSmallInteger('reading_minutes')->default(5);
            $table->string('category');
            $table->string('image')->nullable();
            $table->json('content');
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table): void {
            $table->id();
            $table->text('question');
            $table->text('answer');
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->string('label');
            $table->string('group')->default('general')->index();
            $table->json('value');
            $table->timestamps();
        });

        Schema::create('bookings', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('idempotency_key', 120)->nullable()->unique();
            $table->string('slot_key')->nullable()->unique();
            $table->string('full_name', 120);
            $table->string('phone', 40);
            $table->string('email', 190)->index();
            $table->string('organisation', 160)->nullable();
            $table->string('audience', 120);
            $table->string('service', 160);
            $table->string('curriculum', 40);
            $table->date('preferred_date')->index();
            $table->string('preferred_time', 5);
            $table->text('message');
            $table->json('subjects');
            $table->string('other_subject', 160)->nullable();
            $table->json('attribution')->nullable();
            $table->string('status', 30)->default('reserved')->index();
            $table->string('calendar_status', 30)->default('pending')->index();
            $table->string('notification_status', 30)->default('pending')->index();
            $table->string('provider_reference')->nullable();
            $table->text('internal_notes')->nullable();
            $table->timestamps();

            $table->index(['preferred_date', 'preferred_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('insights');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('programmes');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
