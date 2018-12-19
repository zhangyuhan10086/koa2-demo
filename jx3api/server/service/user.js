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
            portraitUrl: 'https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png', //默认头像
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
    
    return new Promise(function (resolve, reject) {
        User.updateOne(query, {
            $set: {
                portraitUrl: headerImg,
                nickname:nickName,
                sex
            }
        }, {

        }, function (err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        });
    });

}

export const getUserData = async (id) => {
    const user = await User.find({
        _id:id
    })
    if (!user || user.length == 0) {
        return false;
    } else {
        return user[0]
    }

}