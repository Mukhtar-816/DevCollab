const Redis = require("ioredis");


const redis = new Redis(process.env.REDIS_URI);


redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("ready", () => {
    console.log("Redis Cache Ready.");
});

redis.on("error", (err) => {
    console.log("Error Connecting Redis : ", err);
});

module.exports = redis;