const redisDal = require("../DAL/redis.dal.js");
const reusable = require("../utils/reusable.js");

class SessionService {
    constructor() { }

    async createSession(userId, token) {
        const refreshTokenHashed = reusable.generateHash(token);
        const ttl = process.env.SESSION_EXPIRES_IN;
        const expiresAt = new Date(Date.now() + parseInt(ttl) * 1000);
        const session = {
            userId,
            refreshTokenHashed,
            revoked: false,
            expiresAt: expiresAt.toISOString()
        };


        await redisDal.set(`session:${userId}`, session, ttl);
    };

    async getCurrentSession(userId) {
        return await redisDal.get(`session:${userId}`);
    }

    async revokeSession(userId) {
        return await redisDal.del(`session:${userId}`);
    }
};

module.exports = new SessionService();