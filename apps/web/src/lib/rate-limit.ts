import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export type RateLimitCategory = "auth" | "api" | "contact" | "giving";

type RateLimitResult = {
  success: boolean;
  retryAfter?: number;
};

function createRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function createLimiter(redis: Redis, limit: number, window: `${number} ${"s" | "m" | "h" | "d"}`) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    analytics: true,
  });
}

const redis = createRedis();

const limiters = redis
  ? {
      auth: createLimiter(redis, 5, "10 m"),
      api: createLimiter(redis, 100, "1 m"),
      contact: createLimiter(redis, 3, "1 h"),
      giving: createLimiter(redis, 5, "1 h"),
    }
  : null;

export async function checkRateLimit(
  category: RateLimitCategory,
  identifier: string
): Promise<RateLimitResult> {
  if (!limiters) return { success: true };

  const limiter = limiters[category];
  const { success, reset } = await limiter.limit(`${category}:${identifier}`);
  if (success) return { success: true };

  const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
  return { success: false, retryAfter };
}
