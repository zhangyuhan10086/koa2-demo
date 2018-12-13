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

export const boySizeMap = [{
    key: '',
    label: '全部',
}, {
    key: '1',
    label: '成男',
}, {
    key: '2',
    label: '成女',
}, {
    key: '3',
    label: '萝莉',
}, {
    key: '4',
    label: '正太',
}]


// export const hasClass = (elem, cls) => {
//     cls = cls || '';
//     if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
//     return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
// }


// export const addClass = (obj, cls) => {
//     if (!hasClass(ele, cls)) {
//         ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
//     }
// }

// export const removeClass = (obj, cls) => {
//     var obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
//     obj_class = obj_class.replace(/(\s+)/gi, ' '), //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
//         removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
//     var removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
//     obj.className = removed; //替换原来的 class.
// }