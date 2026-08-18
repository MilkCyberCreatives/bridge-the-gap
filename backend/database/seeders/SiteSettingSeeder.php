<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'contact_details',
                'label' => 'Contact Details',
                'group' => 'contact',
                'value' => [
                    'phoneLocal' => '084 233 1687',
                    'phoneIntl' => '+27842331687',
                    'whatsappUrl' => 'https://wa.me/27842331687',
                    'bookingsEmail' => 'info@bridgethegapeducationalservices.co.za',
                    'generalEmail' => 'info@bridgethegapeducationalservices.co.za',
                    'instagramUrl' => 'https://www.instagram.com/bridgethegap_education',
                    'facebookUrl' => 'https://web.facebook.com/bridgethegapeducationalservices',
                    'linkedinUrl' => 'https://www.linkedin.com/company/bridge-the-gap-educational-services',
                    'googleReviewUrl' => 'https://g.page/r/CQq_ysh0ZI1EEBM/review',
                    'googleProfileUrl' => 'https://share.google/aX6FYYiKawGfrb2LN',
                    'timezone' => 'SAST (UTC+2)',
                ],
            ],
            [
                'key' => 'target_audiences',
                'label' => 'Target Audiences',
                'group' => 'content',
                'value' => [
                    ['title' => 'School Leaders', 'summary' => 'Intervention programmes, group tutoring, and teacher development aligned to school outcomes.'],
                    ['title' => 'Parents and Guardians', 'summary' => 'Reliable updates, clear action plans, and practical support for learner progress and matric readiness.'],
                    ['title' => 'Learners', 'summary' => 'Structured academic support, coaching, and confidence-building designed for measurable growth.'],
                ],
            ],
            [
                'key' => 'quick_stats',
                'label' => 'Quick Statistics',
                'group' => 'content',
                'value' => [
                    ['label' => 'Core Service Areas', 'value' => '4'],
                    ['label' => 'Target Client Segments', 'value' => '3'],
                    ['label' => 'Curricula Supported', 'value' => 'CAPS + IB'],
                    ['label' => 'Delivery Models', 'value' => 'Online, In-person, Group'],
                ],
            ],
            [
                'key' => 'form_focus_options',
                'label' => 'Booking Focus Options',
                'group' => 'booking',
                'value' => [
                    'Mathematics',
                    'English',
                    'Physical Sciences',
                    'Life Sciences',
                    'Accounting',
                    'Business Studies',
                    'Economics',
                    'IB Mathematics',
                    'IB Sciences',
                    'IB English',
                    'Matric Rewrite',
                    'Subject Addition',
                    'SBA Portfolio Support',
                    'Teacher Workshop',
                    'Professional Development Programme',
                    'Learner Coaching',
                    'Educator Coaching',
                ],
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::query()->firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
