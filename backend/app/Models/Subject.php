<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'tagline',
        'intro_title',
        'intro_text',
        'outcomes',
        'topics',
        'support',
        'faqs',
        'images',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'outcomes' => 'array',
            'topics' => 'array',
            'support' => 'array',
            'faqs' => 'array',
            'images' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function toFrontendArray(): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'tagline' => $this->tagline,
            'introTitle' => $this->intro_title,
            'introText' => $this->intro_text,
            'outcomes' => $this->outcomes ?? [],
            'topics' => $this->topics ?? [],
            'support' => $this->support ?? [],
            'faqs' => $this->faqs ?? [],
            'images' => $this->images ?? [],
        ];
    }
}
