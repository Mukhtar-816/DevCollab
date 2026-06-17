const User = require("../Models/user.model.js");

class UserDal {
    async findUserByKey(key, value) {
        if (!key) return null;
        const user = await User.findOne({ [key]: value });
        if (!user) return false;
        return user;
    }

    async createUser(data, session = null) {
        if (!data) return null;
        const [user] = await User.create([data], { session });
        if (!user) return null;

        const { passwordHash, ...safeUser } = user.toObject();
        return safeUser;
    }
}

module.exports = new UserDal();