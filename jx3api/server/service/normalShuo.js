const mongoose = require("mongoose")
const NormalShuo = mongoose.model("NormalShuo")

export const publishShuo = async (publisherId, text, imgs) => {
    let normalShuoItem = new NormalShuo({
        publisherId,
        content: {
            text,
            imgs
        }
    });
    await normalShuoItem.save();
}

export const getAllShuo = async () => {
    let query = {};
    const shuoList = await NormalShuo.find(query).populate({
        path: 'publisherId',
        model: 'User',
    }).sort('-meta.updatedAt')
    return shuoList;
}