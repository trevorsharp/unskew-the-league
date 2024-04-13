import { Redis } from "@upstash/redis";
import { env } from "~/env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const get = async <T>(key: string) => redis.get<T>(key);

const set = async <T>(key: string, value: T, ttl: number) => {
  return (await redis.set<T>(key, value, { ex: ttl })) !== null;
};

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

const withCache =
  <TFunc extends (...args: any[]) => Promise<any>>(
    { cacheKey, ttl }: { cacheKey: string; ttl: number },
    func: TFunc,
  ) =>
  async (...args: Parameters<TFunc>): Promise<Awaited<ReturnType<TFunc>>> => {
    const fullCacheKey = `${cacheKey}${args.length > 0 ? "-" : ""}${args.join("-")}`;
    const cacheResult = await get<Awaited<ReturnType<TFunc>>>(fullCacheKey);

    if (cacheResult) return cacheResult;

    const result = await func(...args);

    if (result) await set<Awaited<ReturnType<TFunc>>>(fullCacheKey, result, ttl);

    return result;
  };

export { get, set, withCache };
