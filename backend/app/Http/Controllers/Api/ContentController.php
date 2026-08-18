<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\Insight;
use App\Models\Programme;
use App\Models\SiteSetting;
use App\Models\Subject;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    private function response(array $data): JsonResponse
    {
        return response()->json([
            'ok' => true,
            ...$data,
        ])->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function health(): JsonResponse
    {
        return response()->json([
            'ok' => true,
            'service' => 'bridge-the-gap-backend',
            'timestamp' => now()->toIso8601String(),
        ])->header('Cache-Control', 'no-store, max-age=0');
    }

    public function bootstrap(): JsonResponse
    {
        return $this->response([
            'settings' => SiteSetting::query()
                ->orderBy('group')
                ->orderBy('key')
                ->get()
                ->mapWithKeys(fn (SiteSetting $setting) => [$setting->key => $setting->value]),
            'programmes' => $this->programmeQuery()->get()->map->toFrontendArray()->values(),
            'subjects' => $this->subjectQuery()->get()->map->toFrontendArray()->values(),
            'insights' => $this->insightQuery()->get()->map->toFrontendArray()->values(),
            'faqs' => $this->faqQuery()->get()->map->toFrontendArray()->values(),
        ]);
    }

    public function programmes(): JsonResponse
    {
        return $this->response([
            'programmes' => $this->programmeQuery()->get()->map->toFrontendArray()->values(),
        ]);
    }

    public function programme(string $slug): JsonResponse
    {
        $programme = $this->programmeQuery()->where('slug', $slug)->firstOrFail();

        return $this->response(['programme' => $programme->toFrontendArray()]);
    }

    public function subjects(): JsonResponse
    {
        return $this->response([
            'subjects' => $this->subjectQuery()->get()->map->toFrontendArray()->values(),
        ]);
    }

    public function subject(string $slug): JsonResponse
    {
        $subject = $this->subjectQuery()->where('slug', $slug)->firstOrFail();

        return $this->response(['subject' => $subject->toFrontendArray()]);
    }

    public function insights(): JsonResponse
    {
        return $this->response([
            'insights' => $this->insightQuery()->get()->map->toFrontendArray()->values(),
        ]);
    }

    public function insight(string $slug): JsonResponse
    {
        $insight = $this->insightQuery()->where('slug', $slug)->firstOrFail();

        return $this->response(['insight' => $insight->toFrontendArray()]);
    }

    public function faqs(): JsonResponse
    {
        return $this->response([
            'faqs' => $this->faqQuery()->get()->map->toFrontendArray()->values(),
        ]);
    }

    private function programmeQuery()
    {
        return Programme::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    private function subjectQuery()
    {
        return Subject::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id');
    }

    private function insightQuery()
    {
        return Insight::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->orderByDesc('id');
    }

    private function faqQuery()
    {
        return Faq::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id');
    }
}
