const mongoose = require("mongoose")
const Appearance = mongoose.model("Appearance")

export const publishAppearance = async (publisherId, cover, imgList, appearanceTitle, appearanceName) => {
    let appearanceItem = new Appearance({
        publisherId,
        cover,
        imgList,
        appearanceTitle,
        appearanceName
    });
    await appearanceItem.save();
}

export const getAllAppearance = async () => {
    let query = {};
    const appearanceList = await Appearance.find(query).populate({
        path: 'publisherId',
        model: 'User',
    }).sort('-meta.updatedAt')
    return appearanceList;
}