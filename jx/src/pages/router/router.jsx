import React from "react";
import "../../normalize.css";
import "./router.scss";

import { NavLink, Route, Switch } from 'react-router-dom';
import AC from "../../utils/asyncComponent"

import { Avatar, Popover } from 'antd';

const content = (
  <div className="user_menu_list_router" >
    <div className="menu_item" >登出</div>
  </div>
);


const Home = AC(() => import("../home/home"));
const Discover = AC(() => import("../discover/discover"))
const UserHome = AC(() => import("../userHome/userHome"))

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
            ]
        }
    }
    goOtherPage(path) {

    }

    render() {
        const { navList } = this.state
        return (
            <div>
                <div className="header" >
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
                            <Popover placement="bottom"  content={content}>
                                <Avatar
                                    size="large"
                                    src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
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
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;