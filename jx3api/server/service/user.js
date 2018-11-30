const mongoose = require("mongoose")
const User = mongoose.model("User")

export const getAllUsers = async () => {
    let query = {};
    const users = await User.find(query)
    return users
}

export const registerUser = async (request) => {
    const {
        username,
        password
    } = request;
    const user = await User.find({
        username
    })
    if (!user || user.length == 0) {
        //可以注册
        var userItem = new User({
            username,
            password
        });
        await userItem.save()
        return true;
    } else {
        return false
    }

}

export async function checkPassword(username, password) {
    let match = false

    const user = await User.findOne({
        username
    }).exec()
    if (user) {
        //match = await user.comparePassword(password, user.password)
        match=true;
    }

    return {
        match,
        user
    }
}