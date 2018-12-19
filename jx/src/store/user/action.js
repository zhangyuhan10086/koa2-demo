import * as user from './action-type';

// 保存表单数据

export const resetUserInfo = (info) => {
    return {
        type:user.USERINFORESTD,
        ...info
    }
}