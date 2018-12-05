export const dateTimeFormat = (value, type) => {
    if (!value) {
        return ""
    } else {
        value = parseFloat(value)
        let date = new Date(value); //value为时间戳
        let Y = date.getFullYear() + '-'; //年
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'; //月
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); //日 + ' '; //日
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'; //时
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'; //分
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); //秒
        if (type === 1) {
            return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m + s; // 7/12/2016 16:0:12
        } else if (type === 2) {
            return D + '/' + M.replace('-', '/') + Y.replace('-', '') // 7/12/2016 
        } else if (type === 3) {
            return h + m.replace(":", '') //16:0
        } else if (type === 4) {
            return D + '/' + M.replace('-', '/') + Y.replace('-', '') + ' ' + h + m.replace(":", '') // 7/12/2016 
        } else if (type === 5) {
            return Y + M + D;
        } else if (type === 6) {
            return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m.replace(":", '');
        } else {
            return Y + M + D + " " + h + m + s; // 2016-12-7 16:0:12
            // return D + '/' + M.replace('-', '/') + Y.replace('-', '') + " " + h + m + s; // 7/12/2016 16:0:12
        }
    }
}

export const setCookie = (name, value, days) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");　　
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

export const getUser = () => {
    let user = JSON.parse(getCookie('user'))
    return user;
}

export const isLogin = () => {
    if (getUser() && getCookie('koa:sess')) {
        return true
    } else {
        return false;
    }
}

export const clearAllCookie = () => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}