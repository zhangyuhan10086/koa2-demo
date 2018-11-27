import "./home.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar } from "antd"


export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [

            ]
        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <div className="home_page" >
                <div className="home_header" >
                    这里放网站公告、广告<br />
                </div>
                <div className="filter_box" >
                    这里选择区服、职业
                </div>
                <div className="shuoshuo_wrap" >
                    <div class="shuoshuo_list">
                        <div className="shuoshuo_item">
                            <div className='publisher' >
                                <div className="publisher_head">
                                    <Avatar
                                        size={50}
                                        src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                            <div className="publisher_content" >
                                <div class="publisher_name" >发布人名字</div>
                                <div className="font">
                                    随便发个说说
                                </div>
                                <div className="imgs">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;