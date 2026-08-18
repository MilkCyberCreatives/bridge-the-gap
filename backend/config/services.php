<?php

return [
    'backend' => [
        'token' => env('BACKEND_SERVICE_TOKEN'),
    ],
    'frontend' => [
        'url' => env('FRONTEND_URL', 'http://localhost:3000'),
    ],
];
