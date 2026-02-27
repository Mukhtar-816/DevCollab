import User from "../Models/user.Model.js";

class UserDal {


    findUserByKey = async (key) => {
        const user = await User.findOne(key);
        return user;
    };


    findUserById = async (id) => {

        const user = await User.findById(id);
        return user;

    };
    createUser = async (user) => {

        const userCreated = await User.create(user);
        const { passwordHash, ...userData } = userCreated.toObject();
        return userData;
    }
};


export default UserDal;