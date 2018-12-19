import * as user from './action-type';
import {
    getUser
} from "../../utils/common";

let defaultState = {
    nickname: "",
    portraitUrl: "",
    roleCode: "",
    sex: "",
    username: "",
    _id: "",
}
let info = getUser();

if (info) {
    const {
        nickname,
        portraitUrl,
        roleCode,
        sex,
        username,
        _id
    } = getUser();
    defaultState.nickname = nickname;
    defaultState.portraitUrl = portraitUrl;
    defaultState.roleCode = roleCode;
    defaultState.sex = sex;
    defaultState.username = username;
    defaultState._id = _id;
};

//用户相关
export const userInfo = (state = defaultState, action) => {
    switch (action.type) {
        case user.USERINFORESTD:
            return { ...state,
                ...action
            };
        default:
            return state;
    }
}