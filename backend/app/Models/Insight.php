<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insight extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'excerpt',
        'published_at',
        'reading_minutes',
        'category',
        'image',
        'content',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'published_at' => 'date',
            'is_published' => 'boolean',
        ];
    }

    public function toFrontendArray(): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'publishedAt' => optional($this->published_at)->format('Y-m-d'),
            'readingMinutes' => $this->reading_minutes,
            'category' => $this->category,
            'image' => $this->image,
            'content' => $this->content ?? [],
        ];
    }
}
