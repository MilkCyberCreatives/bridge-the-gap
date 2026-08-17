# Bridge The Gap Website

Premium, mobile-first Next.js website for Bridge The Gap Educational Services.

## Core Service Positioning

- Tutoring Services (CAPS and IB)
- Matric Support Services
- Teacher Professional Development
- Coaching Services

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run build
```

GitHub Actions also starts the production build and smoke-tests critical public routes,
booking API validation, security headers, canonical AI-crawler references, and 404 handling.

## SEO, GEO, and AEO Stack

- Technical SEO: Canonical metadata, robots, sitemap, OpenGraph, and Twitter cards.
- GEO: Verified service-area positioning for South Africa without unsupported location claims.
- AEO: Structured FAQ, service, article, breadcrumb, website, and organisation schema.
- Generative engine support: `public/llms.txt` provides canonical AI-crawler context.

## Analytics and Digital Marketing Tracking

- Vercel Analytics and Speed Insights are enabled with cookie consent.
- Optional GA4 page-view and lead-event tracking:
  - `NEXT_PUBLIC_GA_ID`
- Optional Google Tag Manager:
  - `NEXT_PUBLIC_GTM_ID`
- Optional Meta Pixel lead/pageview tracking:
  - `NEXT_PUBLIC_META_PIXEL_ID`
- Optional search engine verification tags:
  - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  - `NEXT_PUBLIC_BING_SITE_VERIFICATION`

Booking submissions also capture campaign attribution values (`utm_source`, `utm_medium`,
`utm_campaign`, `utm_term`, `utm_content`), landing page, and referrer for reporting in
notification emails.

## Booking and Availability

The booking form posts to `POST /api/consultation` and loads available slots from
`GET /api/availability?date=YYYY-MM-DD`.

The API applies request validation, no-store responses, request IDs, request-size checks,
same-origin protection, and best-effort per-instance throttling. When Google Calendar is
configured, booking events use deterministic slot IDs to reduce duplicate booking races and
are created as private events.

### Required for notifications

- `RESEND_API_KEY`

### Optional booking mailbox routing

- `BOOKING_RECIPIENT_EMAIL` (defaults to `info@bridgethegapeducationalservices.co.za`)
- `BOOKING_FROM_EMAIL`

### Optional Google Calendar sync

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY` (escaped with `\n` in Vercel env UI)

When Calendar environment variables are set, selected booking slots are checked against
calendar busy windows and events are created automatically.

## Security and Reliability

- Public responses include `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- Booking API errors return safe client messages and do not expose provider configuration.
- Google Calendar events are private and Resend delivery results are checked explicitly.
- `GET /api/health` provides a no-store health endpoint without exposing credentials.
- Dependabot checks npm and GitHub Actions dependencies monthly.

A persistent transactional booking datastore is still recommended for full cross-instance
idempotency, durable audit history, and guaranteed distributed slot locking.

## Routing Notes

Legacy routes are redirected in `next.config.mjs`:

- `/programmes/learner-support` -> `/programmes/tutoring-services`
- `/programmes/educator-development` -> `/programmes/teacher-professional-development`
- `/programmes/study-skills` -> `/programmes/coaching-services`
- `/subjects/request` -> `/request-a-subject`
- `/subjects/sciences` -> `/subjects/physical-sciences`
