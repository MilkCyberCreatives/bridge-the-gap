<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyServiceToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $configured = (string) config('services.backend.token', '');

        if ($configured === '') {
            return response()->json([
                'ok' => false,
                'message' => 'Service authentication is not configured.',
            ], 503);
        }

        $provided = (string) ($request->bearerToken() ?: $request->header('X-Backend-Token', ''));

        if ($provided === '' || ! hash_equals($configured, $provided)) {
            return response()->json([
                'ok' => false,
                'message' => 'Unauthorised.',
            ], 401);
        }

        return $next($request);
    }
}
