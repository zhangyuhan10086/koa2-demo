import "./home.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal } from "antd"
import { NormalPublish } from "../components/NormalPublish"

export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [

            ],
            visible: false,
        }
    }
    cancel = (value) => {
        this.setState({ visible: value })
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
                    <div className="shuoshuo_list">
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
                                <div className="publisher_name" >发布人名字</div>
                                <div className="font">
                                    随便发个说说
                                </div>
                                <ul className="imgs">
                                    <li>
                                        <img src="//ww2.sinaimg.cn/thumb150/95210491gy1fxnsslw65yj20c807cwej.jpg" />
                                    </li>
                                    <li>
                                        <img src="//ww2.sinaimg.cn/thumb150/95210491gy1fxnsslw65yj20c807cwej.jpg" />
                                    </li>
                                </ul>
                            </div>
                        </div>
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
                                <div className="publisher_name" >发布人名字</div>
                                <div className="font">
                                    随便发个说说
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="poster_btn" onClick={() => { this.setState({ visible: true }) }} >
                        <Icon type="plus" style={{ color: "#fff", fontSize: "20px" }} />
                    </div>
                </div>
                <NormalPublish visible={this.state.visible}  onCancel={this.cancel} />
            </div>
        )
    }
}

export default Home;