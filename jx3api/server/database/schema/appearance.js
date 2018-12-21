const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// unique: true,
// required: true,

const appearance = new Schema({
    publisherId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    imgList: [String],
    appearanceTitle: {
        type: String,
        required: true,
    },
    appearanceName: {
        type: String,
    },
    reply: [{
        replyId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        replyContent: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Number,
            default: Date.now()
        },
        updatedAt: {
            type: Number,
            default: Date.now()
        }
    }],
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
appearance.pre('save', function (next) {
    if (this.isNew) {
        let date = Date.now();
        this.meta.createdAt = date;
        this.meta.updatedAt = date;
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

appearance.pre('updateOne', function (next) {
    this.update({
        'meta.updatedAt':Date.now()
    })
    next()
})


mongoose.model('Appearance', appearance)