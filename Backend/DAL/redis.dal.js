const redis = require("../config/redis.js");

class RedisDal {
    async set(key, value, ttl = 600) {
        if (!key) throw new Error("redis key is required");
        const data = typeof value === "string" ? value : JSON.stringify(value);
        return redis.set(key, data, "EX", ttl);
    }

    async get(key) {
        if (!key) return null;
        const data = await redis.get(key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    async getDel(key) {
        if (!key) return null;
        const data = await redis.getdel(key);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return data;
        }
    }

    async del(key) {
        if (!key) return 0;
        return redis.del(key);
    }

    async exists(key) {
        if (!key) return 0;
        return redis.exists(key);
    }
}

module.exports = new RedisDal();