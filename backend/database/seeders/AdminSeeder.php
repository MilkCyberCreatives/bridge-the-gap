<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = trim((string) env('ADMIN_EMAIL', ''));
        $password = (string) env('ADMIN_PASSWORD', '');

        if ($email === '' || $password === '') {
            return;
        }

        User::query()->firstOrCreate(
            ['email' => mb_strtolower($email)],
            [
                'name' => env('ADMIN_NAME', 'Bridge The Gap Admin'),
                'password' => Hash::make($password),
                'is_admin' => true,
            ],
        );
    }
}
