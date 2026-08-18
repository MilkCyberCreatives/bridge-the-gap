<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'public_id',
        'idempotency_key',
        'slot_key',
        'full_name',
        'phone',
        'email',
        'organisation',
        'audience',
        'service',
        'curriculum',
        'preferred_date',
        'preferred_time',
        'message',
        'subjects',
        'other_subject',
        'attribution',
        'status',
        'calendar_status',
        'notification_status',
        'provider_reference',
        'internal_notes',
    ];

    protected function casts(): array
    {
        return [
            'subjects' => 'array',
            'attribution' => 'array',
            'preferred_date' => 'date',
        ];
    }
}
