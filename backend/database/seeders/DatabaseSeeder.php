<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ProgrammeSeeder::class,
            SubjectSeeder::class,
            InsightSeeder::class,
            FaqSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
