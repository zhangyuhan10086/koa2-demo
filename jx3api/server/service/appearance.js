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

export const getAllAppearance = async (start, limit, keyword) => {
    const reg = new RegExp(keyword, 'i') //不区分大小写
    let query = {
        $or: [{
            appearanceTitle: {
                $regex: reg
            }
        }, ],
    };

    const total = await Appearance.count(query);
    const appearanceList = await Appearance.find(query).populate({
            path: 'publisherId',
            model: 'User',
        })
        .populate({
            path: 'reply.replyId',
            model: 'User',
        })
        .sort('-meta.updatedAt')
        .skip((start - 1) * limit)
        .limit(limit);
    return {
        total,
        currentPage: start,
        results: appearanceList
    };

}
export const getDetail = async (id) => {
    let query = {
        _id: id
    };
    const appearanceItem = await Appearance.find(query).populate({
            path: 'publisherId',
            model: 'User',
        })
        .populate({
            path: 'reply.replyId',
            model: 'User',
        })
        .sort('-meta.updatedAt');
    return appearanceItem;
}


export const reply = async (publisherId, id, replyContent) => {
    let query = {
        _id: id
    };
    let replyItem = {
        replyId: publisherId,
        replyContent: replyContent,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    return new Promise(function (resolve, reject) {
        Appearance.updateOne(query, {
            $push: {
                reply: replyItem
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