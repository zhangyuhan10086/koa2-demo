import React from 'react';
import ReactDOM from 'react-dom';
// import App from './pages/router/router';
import AC from "./utils/asyncComponent"


import {
    HashRouter,Route,Switch
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';



import 'antd/dist/antd.css';


const App = AC(() => import("./pages/router/router"));
const Login =AC(() => import("./pages/login/login"));
const Register=AC(()=>import("./pages/register/register") )

const rootElement=document.getElementById("app")

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Login path="/login"   component={Login} />
            <Register path="/register"  component={Register } />
            <Route path="/" component={App} />
        </Switch>
    </HashRouter>, rootElement);

serviceWorker.unregister();


