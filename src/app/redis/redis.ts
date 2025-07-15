import { createClient } from "redis";
import config from "../config";

const redisClient = createClient({
  url: config.redis_url,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis connected");
  }
};

connectRedis().catch((err) => console.error("❌ Redis connection failed:", err));

export default redisClient;
