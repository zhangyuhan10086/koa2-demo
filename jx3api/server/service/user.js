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
            password,
            portraitUrl: 'https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png', //默认头像
            nickname: '默认用户' + Date.now()
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
        match = true;
    }

    return {
        match,
        user
    }
}