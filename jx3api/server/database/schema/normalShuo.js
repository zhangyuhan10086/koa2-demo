const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// unique: true,
// required: true,

const normalShuo = new Schema({
    publisherId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        text: {
            type: String,
            required: true,
        },
        imgs: [String]
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
normalShuo.pre('save', function (next) {
    console.log("this", this.isNew)
    if (this.isNew) {
        let date = Date.now();
        this.meta.createdAt = date;
        this.meta.updatedAt = date;
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})



mongoose.model('NormalShuo', normalShuo)