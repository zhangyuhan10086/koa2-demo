import axios from "axios"

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
            resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
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