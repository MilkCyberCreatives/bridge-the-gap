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
npm run lint
npm run build
```

## Booking and Availability

The booking form posts to `POST /api/consultation` and loads available slots from
`GET /api/availability?date=YYYY-MM-DD`.

### Required for notifications

- `RESEND_API_KEY`

### Optional booking mailbox routing

- `BOOKING_RECIPIENT_EMAIL` (defaults to `info@bridgethegapeducationalservices.co.za`)
- `BOOKING_FROM_EMAIL`

### Optional Google Calendar sync (to block unavailable slots)

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY` (escaped with `\n` in Vercel env UI)

When Calendar env vars are set, selected booking slots are checked against calendar
busy windows and events are created automatically.

## Routing Notes

Legacy routes are redirected in `next.config.mjs`:

- `/programmes/learner-support` -> `/programmes/tutoring-services`
- `/programmes/educator-development` -> `/programmes/teacher-professional-development`
- `/programmes/study-skills` -> `/programmes/coaching-services`
- `/subjects/request` -> `/request-a-subject`
- `/subjects/sciences` -> `/subjects/physical-sciences`
