const mongoose = require("mongoose")
const NormalShuo = mongoose.model("NormalShuo")

export const publishShuo = async (publisherId, text, imgs) => {
    console.log(publisherId)
    let normalShuoItem = new NormalShuo({
        publisherId,
        content: {
            text,
            imgs
        }
    });
    await normalShuoItem.save();
}