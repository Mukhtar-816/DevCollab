const redisDal = require("../DAL/redis.dal.js");
const reusable = require("../utils/reusable.js");

class SessionService {
    constructor(){}

    async createSession (userId, token) {
        const refreshTokenHashed = reusable.generateHash(token);

        const session = {
            userId,
            refreshTokenHashed,
            revoked: false,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        const ttl = 7 * 24 * 60 * 60;

        await redisDal.set(`session:${userId}`, session, ttl);
    };

    async getCurrentSession (userId) {
        return await redisDal.get(`session:${userId}`);
    }

    async revokeSession (userId) {
        return await redisDal.del(`session:${userId}`);
    }
};

module.exports =  new SessionService();