# Bridge The Gap Laravel Backend

This directory contains the Laravel CMS, admin dashboard, and durable booking store for the existing Bridge The Gap Next.js website.

## Stack

- Laravel 13
- Filament 5 admin panel
- SQLite for local development/tests
- MySQL or PostgreSQL supported in production
- PHP 8.3+

## Local setup

```bash
cd backend
composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate --seed
php artisan bridge:admin
php artisan storage:link
php artisan serve
```

Open `http://localhost:8000/admin`.

No administrator password is hard-coded in the repository. Either run `php artisan bridge:admin` or set `ADMIN_EMAIL` and `ADMIN_PASSWORD` before the first `php artisan migrate --seed`.

## Public API

- `GET /api/v1/health`
- `GET /api/v1/bootstrap`
- `GET /api/v1/programmes`
- `GET /api/v1/programmes/{slug}`
- `GET /api/v1/subjects`
- `GET /api/v1/subjects/{slug}`
- `GET /api/v1/insights`
- `GET /api/v1/insights/{slug}`
- `GET /api/v1/faqs`
- `POST /api/v1/bookings`

`PATCH /api/v1/bookings/{publicId}/sync` is server-to-server only and requires `BACKEND_SERVICE_TOKEN`.

## Mirroring strategy

The initial database seeder mirrors the approved content already present in the Next.js frontend. Seeders use `firstOrCreate`, so re-running them will not overwrite later client edits.

The Next.js integration should set:

```env
LARAVEL_BACKEND_URL=https://your-backend-host.example
LARAVEL_SERVICE_TOKEN=the-same-secret-as-BACKEND_SERVICE_TOKEN
```

The frontend keeps its current static data as a fail-safe fallback until the backend URL is configured and healthy.

## Production

Use a PHP-capable host with PHP 8.3+, HTTPS, and MySQL/PostgreSQL. Set `APP_ENV=production`, `APP_DEBUG=false`, a strong `APP_KEY`, production database credentials, `FRONTEND_URL`, and a long random `BACKEND_SERVICE_TOKEN`.

Run on deploy:

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize
php artisan filament:optimize
php artisan storage:link
```
