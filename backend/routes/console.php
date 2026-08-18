<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

Artisan::command('bridge:admin {email?}', function (?string $email = null): int {
    $email = $email ?: $this->ask('Admin email');
    $name = $this->ask('Admin name', 'Bridge The Gap Admin');
    $password = $this->secret('Password');

    if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $this->error('Please provide a valid email address.');
        return self::FAILURE;
    }

    if (! is_string($password) || strlen($password) < 12) {
        $this->error('Use a password with at least 12 characters.');
        return self::FAILURE;
    }

    User::updateOrCreate(
        ['email' => mb_strtolower(trim($email))],
        [
            'name' => trim((string) $name),
            'password' => Hash::make($password),
            'is_admin' => true,
        ],
    );

    $this->info('Administrator account is ready.');
    return self::SUCCESS;
})->purpose('Create or update a Bridge The Gap administrator.');
