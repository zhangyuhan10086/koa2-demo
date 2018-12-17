const mongoose = require("mongoose");
// const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
// const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// unique: true,
// required: true,

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    sex: {
        type: String,
    },
    portraitUrl: {
        type: String,
        required: true,
    },
    roleCode: {
        type: Number,
        required: true,
    },
    meta: {
        createdAt: {
            type: Number,
            default: Date.now()
        },
        updatedAt: {
            type: Number,
            default: Date.now()
        }
    }
});

//保存前中间件
userSchema.pre('save', function (next) {
    //保存前密码加盐
    let user = this
    next();
    //if (!user.isModified('password')) return next()
    // bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    //     if (err) return next(err)

    //     bcrypt.hash(user.password, salt, (error, hash) => {
    //         if (error) return next(error)

    //         user.password = hash
    //         next()
    //     })
    // })
})
userSchema.pre('save', function (next) {
    console.log("this", this)
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

//虚拟字段
userSchema.virtual("isLocked").get(function () {
    return true
})

//userSchema的实例方法
userSchema.methods = {
    comparePassword: (_password, password) => {
        // return new Promise((resolve, reject) => {
        //     bcrypt.compare(_password, password, (err, isMatch) => {
        //         if (!err) resolve(isMatch)
        //         else reject(err)
        //     })
        // })
    },
    incLoginAttepts: (user) => {

    }
}

mongoose.model('User', userSchema)