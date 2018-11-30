import axios from "axios"
import {
    message
} from 'antd';
export default (method, url, params) => {
    return new Promise((resolve, reject) => {
        let config = {
            method,
            url,
        }
        if (method.toLowerCase() === "post") {
            config['data'] = params;
        } else {
            config['params'] = params;
        }
        axios(config).then((res) => {
            let result = typeof res.data === 'object' ? res.data : JSON.parse(res.data);
            if (result.code == 401) {
                message.warning('未登录，即将跳转至登录页面');
                setTimeout(() => {
                    window.location.href = "/#/login";
                }, 1500)
            };
            resolve(result)
        }).catch((error) => {
            if (error.response) {
                reject(error.response.data)
            } else {
                reject(error)
            }
        });
    })
}



// export default class _axios {
// 	axios(method, url, params) {
// 		return new Promise((resolve, reject) => {
// 			if (typeof params !== 'object') params = {};
// 			let _option = params;
// 			_option = {
// 				method,
// 				url,
// 				timeout: 30000,
// 				params: null,
// 				data: null,
// 				headers: null,
// 				withCredentials: true, //是否携带cookies发起请求
// 				validateStatus: (status) => {
// 					return status >= 200 && status < 300;
// 				},
// 				...params,
// 			}
// 			axios.request(_option).then(res => {
// 				resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
// 			}, error => {
// 				if (error.response) {
// 					reject(error.response.data)
// 				} else {
// 					reject(error)
// 				}
// 			})
// 		})
// 	}
// }