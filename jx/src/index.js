import React from 'react';
import ReactDOM from 'react-dom';
// import App from './pages/router/router';
import AC from "./utils/asyncComponent"
import _axios from './utils/_axios'
import "./normalize.css";


import {
    HashRouter,Route,Switch
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';



import 'antd/dist/antd.css';


const App = AC(() => import("./pages/router/router"));
const Login =AC(() => import("./pages/login/login"));
const Register=AC(()=>import("./pages/register/register") )

const rootElement=document.getElementById("app");

//获取七牛token存在本地
;( async function(){
    try{
        let res = await _axios("get", "/api/qiniu/getToken");
        if(res.success){
            sessionStorage.setItem("qiniuToken",res.token)
        }else{
            console.log(res.remark)
        }
    }catch(err){
        console.log(err)
    }
})();
//设置一个全局的图片域名
const imgDomain="http://piy3e9xq1.bkt.clouddn.com/";
sessionStorage.setItem("imgDomain",imgDomain)





ReactDOM.render(
    <HashRouter>
        <Switch>
            <Login path="/login"   component={Login} />
            <Register path="/register"  component={Register } />
            <Route path="/" component={App} />
        </Switch>
    </HashRouter>, rootElement);

serviceWorker.unregister();


