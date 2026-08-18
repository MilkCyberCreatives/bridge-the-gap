<?php

namespace Database\Seeders;

use App\Models\Programme;
use Illuminate\Database\Seeder;

class ProgrammeSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'slug' => 'tutoring-services',
                'title' => 'Tutoring Services',
                'short_title' => 'Tutoring',
                'summary' => 'Academic tutoring across CAPS and IB curricula for individual learners, small groups, and school intervention programmes.',
                'audience' => 'Learners, parents, and school leadership teams',
                'benefits' => [
                    'Clarifies concepts quickly and closes learning gaps.',
                    'Builds confidence and stronger study habits.',
                    'Supports both one-on-one and group tutoring models.',
                    'Provides consistent feedback for parents and school teams.',
                ],
                'focus_areas' => [
                    'Individual tutoring plans',
                    'Group tutoring for school interventions',
                    'Assessment and exam preparation',
                    'Progress tracking and feedback loops',
                ],
                'subject_lists' => [
                    ['headline' => 'CAPS Subjects', 'items' => [
                        'Mathematics and Mathematical Literacy',
                        'English Home Language and First Additional Language',
                        'Physical Sciences and Life Sciences',
                        'Accounting, Business Studies, Economics',
                    ]],
                    ['headline' => 'IB Subjects', 'items' => [
                        'Mathematics AA and AI',
                        'English A and English B',
                        'Biology, Chemistry, Physics',
                        'Business Management and Economics',
                    ]],
                    ['headline' => 'Other', 'items' => [
                        'Additional subjects can be requested through the consultation form.',
                    ]],
                ],
            ],
            [
                'slug' => 'matric-support',
                'title' => 'Matric Support Services',
                'short_title' => 'Matric Support',
                'summary' => 'Matric rewrites, matric tutoring, subject additions, and SBA portfolio support for focused results improvement.',
                'audience' => 'Matric learners, rewrite candidates, and parents',
                'benefits' => [
                    'Creates structured rewrite and recovery plans.',
                    'Targets high-impact topics and exam technique.',
                    'Supports SBA portfolio quality and deadlines.',
                    'Improves confidence under exam conditions.',
                ],
                'focus_areas' => [
                    'Matric rewrite strategy',
                    'Subject addition support',
                    'SBA portfolio planning and review',
                    'Past paper drills and exam readiness',
                ],
                'subject_lists' => [
                    ['headline' => 'CAPS Matric Subjects', 'items' => [
                        'Mathematics and Mathematical Literacy',
                        'Physical Sciences and Life Sciences',
                        'Accounting, Business Studies, Economics',
                        'English HL and FAL',
                    ]],
                    ['headline' => 'IB Diploma Support', 'items' => [
                        'Mathematics AA and AI exam prep',
                        'Sciences practical and theory revision',
                        'English response and essay support',
                        'Business and Economics revision',
                    ]],
                    ['headline' => 'Other', 'items' => [
                        'Custom subject support available on request.',
                    ]],
                ],
            ],
            [
                'slug' => 'teacher-professional-development',
                'title' => 'Teacher Professional Development',
                'short_title' => 'Teacher Development',
                'summary' => 'Workshops, training programmes, and coaching for teachers and education professionals.',
                'audience' => 'School leaders, teachers, and education professionals',
                'benefits' => [
                    'Strengthens lesson delivery and classroom outcomes.',
                    'Improves assessment quality and moderation consistency.',
                    'Supports curriculum implementation across CAPS and IB.',
                    'Provides practical classroom-ready strategies.',
                ],
                'focus_areas' => [
                    'Teacher workshops and training sessions',
                    'Professional development programmes',
                    'Instructional coaching cycles',
                    'Assessment design and moderation support',
                ],
                'subject_lists' => [
                    ['headline' => 'Curriculum Areas', 'items' => [
                        'CAPS curriculum planning and pacing',
                        'IB curriculum alignment and assessment',
                        'Phase and subject department strategy',
                        'Whole-school intervention planning',
                    ]],
                    ['headline' => 'Programme Focus Areas', 'items' => [
                        'Pedagogy and differentiated instruction',
                        'Assessment literacy and data use',
                        'Classroom management and engagement',
                        'Leadership support for academic teams',
                    ]],
                    ['headline' => 'Other', 'items' => [
                        'Tailored workshop themes can be scoped per school.',
                    ]],
                ],
            ],
            [
                'slug' => 'coaching-services',
                'title' => 'Coaching Services',
                'short_title' => 'Coaching',
                'summary' => 'Stand-alone coaching for learners and education professionals, or integrated into development programmes.',
                'audience' => 'Learners, teachers, and school leadership teams',
                'benefits' => [
                    'Builds accountability with measurable growth plans.',
                    'Improves performance mindset and follow-through.',
                    'Supports personal leadership and communication skills.',
                    'Integrates with tutoring or professional development where needed.',
                ],
                'focus_areas' => [
                    'Learner performance coaching',
                    'Educator coaching and reflective practice',
                    'School leadership coaching conversations',
                    'Goal-setting and accountability check-ins',
                ],
                'subject_lists' => [
                    ['headline' => 'Learner Coaching Focus', 'items' => [
                        'Study systems and consistency',
                        'Exam confidence and focus',
                        'Goal setting and accountability',
                        'Learning resilience habits',
                    ]],
                    ['headline' => 'Professional Coaching Focus', 'items' => [
                        'Instructional leadership',
                        'Professional confidence and communication',
                        'Team coaching for education staff',
                        'Personal growth planning for educators',
                    ]],
                    ['headline' => 'Other', 'items' => [
                        'Coaching tracks can be custom-designed per client.',
                    ]],
                ],
            ],
        ];

        foreach ($items as $index => $item) {
            Programme::query()->firstOrCreate(
                ['slug' => $item['slug']],
                [...$item, 'sort_order' => $index + 1, 'is_published' => true],
            );
        }
    }
}
