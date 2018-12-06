import React from "react";
import "./router.scss";

import { NavLink, Route, Switch } from 'react-router-dom';
import AC from "../../utils/asyncComponent"
import _axios from '../../utils/_axios'

import { Avatar, Popover, message } from 'antd';
import { getUser, clearAllCookie } from "../../utils/common"

const content = (e) => {
    return (
        <div className="user_menu_list_router" >
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
            userInfo: getUser() || {}
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
    goOtherPage(path) {

    }
    async logoOut() {
        clearAllCookie();
        message.success('登出成功');
    }
    render() {
        const { navList } = this.state
        return (
            <div>
                <div className="header" >
                    {this.state.userInfo.roleCode == 110 ? <div className="console" onClick={this.openConsole} ></div> : null}
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
                        <div className="hearder_right">
                            <Popover placement="bottom" content={content(this)}>
                                <Avatar
                                    size="large"
                                    src={this.state.userInfo.portraitUrl}
                                    style={{ cursor: "pointer" }}
                                />
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="content" >
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/discover" component={Discover} />
                        <Route path="/userHome/:uid" component={UserHome} />
                        <Route path="/matchingTeam" component={MatchingTeam} />
                        <Route path="/appearance" component={Appearance} />
                        <Route path="/publish" component={Publish} />
                        <Route path="/fb" component={Fb} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;