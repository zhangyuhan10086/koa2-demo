import React from "react";
import "./router.scss";

import { NavLink, Route, Switch } from 'react-router-dom';
import AC from "../../utils/asyncComponent"
import _axios from '../../utils/_axios'

import { Avatar, Popover, message } from 'antd';
import { getUser } from "../../utils/common"

const content = (e) => {
    let _this = e;
    return (
        <div className="user_menu_list_router" >
            <div className="menu_item" onClick={_this.logoOut} >登出</div>
        </div>
    )
}

// const content = (
//     <div className="user_menu_list_router" >
//         <div className="menu_item" onClick={this.logoOut} >登出</div>
//     </div>
// );


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
            ],
            userInfo: getUser() || {}
        }
    }
    goOtherPage(path) {

    }
    async logoOut() {
        try {
            let res = await _axios("post", "/api/user/logout");
            if (res.success) {
                message.success('登出成功');
            }
        } catch (err) {
            console.log(err)
        }
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
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;