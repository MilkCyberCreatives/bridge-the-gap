<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'short_title',
        'summary',
        'audience',
        'benefits',
        'focus_areas',
        'subject_lists',
        'image',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'focus_areas' => 'array',
            'subject_lists' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function toFrontendArray(): array
    {
        return [
            'id' => $this->slug,
            'slug' => $this->slug,
            'title' => $this->title,
            'shortTitle' => $this->short_title,
            'summary' => $this->summary,
            'audience' => $this->audience,
            'benefits' => $this->benefits ?? [],
            'focusAreas' => $this->focus_areas ?? [],
            'subjectLists' => $this->subject_lists ?? [],
            'image' => $this->image,
        ];
    }
}
