<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', [ContentController::class, 'health']);
    Route::get('/bootstrap', [ContentController::class, 'bootstrap']);
    Route::get('/programmes', [ContentController::class, 'programmes']);
    Route::get('/programmes/{slug}', [ContentController::class, 'programme']);
    Route::get('/subjects', [ContentController::class, 'subjects']);
    Route::get('/subjects/{slug}', [ContentController::class, 'subject']);
    Route::get('/insights', [ContentController::class, 'insights']);
    Route::get('/insights/{slug}', [ContentController::class, 'insight']);
    Route::get('/faqs', [ContentController::class, 'faqs']);

    Route::post('/bookings', [BookingController::class, 'store'])
        ->middleware('throttle:10,1');

    Route::patch('/bookings/{publicId}/sync', [BookingController::class, 'sync'])
        ->middleware('service.token');
});
