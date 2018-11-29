const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

// unique: true,
// required: true,

const normalShuo = new Schema({
    publisherId: {
        type: String,
        required: true,
    },
    content: {
        text: {
            type: String,
            required: true,
        },
        imgs:[String]
    },
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

//保存前中间件
normalShuo.pre('save', function (next) {

    next();
  
})



mongoose.model('NormalShuo', normalShuo)