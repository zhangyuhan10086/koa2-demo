const mongoose = require("mongoose")
const User = mongoose.model("User")

export const getAllUsers = async () => {
    let query = {};
    const users = await User.find(query)
    return users
}

export const registerUser = async (username, password) => {
    const user = await User.find({
        username
    })
    if (!user || user.length == 0) {
        //可以注册
        var userItem = new User({
            username,
            password,
            portraitUrl: 'FpMzqkcl_FO1NipW7yI6TGp0fC5F', //默认头像
            nickname: '默认用户' + Date.now(),
            roleCode: 1, //1就是普通用户
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

export const upDateUser = async (id, headerImg, nickName, sex) => {
    let query = {
        _id: id
    };
    try {
        let res = await User.where(query).updateOne({
            portraitUrl: headerImg,
            nickname: nickName,
            sex,
        });
        return res;
    } catch (err) {
        return err;
    }

}

export const getUserData = async (id) => {
    const user = await User.find({
        _id: id
    })
    if (!user || user.length == 0) {
        return false;
    } else {
        return user[0]
    }

}