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