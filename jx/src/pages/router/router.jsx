import React from "react";
import "./router.scss";

import { NavLink, Route, Switch } from 'react-router-dom';
import AC from "../../utils/asyncComponent"
import _axios from '../../utils/_axios'
import { connect } from 'react-redux';
import { Avatar, Popover, message } from 'antd';
import { isLogin, clearAllCookie } from "../../utils/common"

const content = (e) => {
    return (
        <div className="user_menu_list_router" >
            <div className="menu_item" onClick={e.toSetting} >设置</div>
            <div className="menu_item" onClick={e.logoOut} >登出</div>
        </div>
    )
}



const Home = AC(() => import("../home/home"));
const Discover = AC(() => import("../discover/discover"))
const UserHome = AC(() => import("../userHome/userHome"))
const MatchingTeam = AC(() => import("../matchingTeam/matchingTeam"))
const Appearance = AC(() => import("../appearance/appearance"))
const Publish = AC(() => import("../appearance/publish"))
const Fb = AC(() => import("../console/fb/fb"))
const Setting = AC(() => import("../user/setting"))

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [
                {
                    name: "主站",
                    path: "/home"
                },
                {
                    name: "发现",
                    path: "/discover"
                },
                {
                    name: "组队",
                    path: "/matchingTeam"
                },
                {
                    name: "外观",
                    path: "/appearance"
                },
            ],

            imgDomain: sessionStorage.getItem("imgDomain") || '',
            contentMinH: '',
            isLogin: isLogin()
        }
    }

    //打开console目录
    openConsole = () => {
        this.setState({
            navList: [
                {
                    name: "副本",
                    path: "/fb"
                },
            ],
        })
    }
    //去登录页面
    toLoginPage = () => {
        this.props.history.push(`/login`);
    }
    //到个人设置页面
    toSetting = () => {
        this.props.history.push(`/setting`);
    }
    //登出
    async logoOut() {
        clearAllCookie();
        message.success('登出成功');
        setTimeout(() => {
            window.location.reload();
        }, 400)
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.setState({
            contentMinH: document.documentElement.clientHeight - 107
        });
    }
    render() {
        const { navList, isLogin } = this.state
        const { userInfo } = this.props;
        return (
            <div>
                <div className="header" >
                    {userInfo.roleCode == 110 ? <div className="console" onClick={this.openConsole} ></div> : null}
                    <div className="header_inner">
                        <div className="header_left" >
                            {
                                navList.map((i, index) => (
                                    <NavLink key={index}
                                        className="nav_item"
                                        to={i.path}>
                                        {i.name}
                                    </NavLink >
                                ))
                            }
                        </div>
                        {isLogin ?
                            <div className="hearder_right"  >
                                <Popover placement="bottom" content={content(this)}>
                                    <Avatar
                                        size="large"
                                        src={this.state.imgDomain + userInfo.portraitUrl}
                                        style={{ cursor: "pointer" }}
                                    />
                                </Popover>
                            </div> :
                            <div className="hearder_right">
                                <div className="login_btn" onClick={this.toLoginPage} >登录</div>
                            </div>
                        }
                    </div>
                </div>
                <div className="content" style={{ minHeight: this.state.contentMinH }} >
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/discover" component={Discover} />
                        <Route path="/userHome/:uid" component={UserHome} />
                        <Route path="/matchingTeam" component={MatchingTeam} />
                        <Route path="/appearance" component={Appearance} />
                        <Route path="/publish" component={Publish} />
                        <Route path="/fb" component={Fb} />
                        <Route path="/setting" component={Setting} />
                    </Switch>
                </div>
                <div className="footer_c">
                    <p >
                        <span className="mail" >
                            版权、合作：450008307@qq.com
                        </span>
                    </p>
                    <p className="powered_by" > j3wg © 2018 Powered by
                        <span style={{ color: "#f0d055" }} >Koa</span> +
                        <span style={{ color: "#59cfdc" }}  >React</span>.
                    </p>
                </div>
            </div >
        )
    }
}

export default connect(
    state => {
        return {
            userInfo: state.userInfo
        }
    },
)(App);