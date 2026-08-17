type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
};

type RateLimitGlobal = typeof globalThis & {
  __btgRateLimitBuckets?: Map<string, RateLimitBucket>;
};

const globalStore = globalThis as RateLimitGlobal;
const buckets = globalStore.__btgRateLimitBuckets ?? new Map<string, RateLimitBucket>();
globalStore.__btgRateLimitBuckets = buckets;

function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const forwardedIp = forwarded?.split(",")[0]?.trim();
  return (
    forwardedIp ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 1000) return;

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function consumeRateLimit(
  req: Request,
  scope: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${scope}:${getClientKey(req)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      remaining: Math.max(0, limit - 1),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      remaining: 0,
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: true,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    remaining: Math.max(0, limit - current.count),
  };
}
