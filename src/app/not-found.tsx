import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative w-full py-20 sm:py-28">
      <div className="container-tight">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-border bg-white/80 p-8 text-center backdrop-blur-xl sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
            Page Not Found
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            We could not find that page.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/65 sm:text-base">
            The page may have moved or the address may be incorrect. You can return home or
            contact Bridge The Gap for assistance.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="btn-water inline-flex h-12 items-center justify-center rounded-full bg-[rgb(var(--brand))] px-7 text-sm font-bold text-white"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="water-hover inline-flex h-12 items-center justify-center rounded-full border border-border bg-white px-7 text-sm font-bold text-black/75"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
