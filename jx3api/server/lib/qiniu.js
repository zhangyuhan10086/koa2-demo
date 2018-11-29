import qiniu, {
    conf
} from "qiniu";
import mongoose from "mongoose";
import config from "../../config";
const {
    AK,
    SK,
    bucket
} = config.qiniu;


export const getQiniuToken = () => {
    let mac = new qiniu.auth.digest.Mac(AK, SK);
    let options = {
        scope: bucket,
        expires: 3600 * 24
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}