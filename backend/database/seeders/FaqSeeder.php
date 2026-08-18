<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['question' => 'Do you only provide tutoring?', 'answer' => 'No. Tutoring is one service area. We also provide matric support, teacher professional development, and coaching services.'],
            ['question' => 'Which curricula do you support?', 'answer' => 'We support subjects and focus areas across CAPS and IB curricula.'],
            ['question' => 'Can schools request group tutoring interventions?', 'answer' => 'Yes. Group tutoring is available as part of school intervention programmes and can be scoped with school leaders.'],
            ['question' => 'Can bookings sync with calendar availability?', 'answer' => 'Yes. The booking flow supports calendar availability checks when Google Calendar credentials are configured in Vercel.'],
            ['question' => 'Where are you based?', 'answer' => 'Online and in-person options are available depending on the programme.'],
        ];

        foreach ($items as $index => $item) {
            Faq::query()->firstOrCreate(
                ['question' => $item['question']],
                [...$item, 'sort_order' => $index + 1, 'is_published' => true],
            );
        }
    }
}
