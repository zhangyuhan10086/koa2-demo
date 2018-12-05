import "./home.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal, message } from "antd"
import { NormalPublish } from "../components/NormalPublish"
import _axios from '../../utils/_axios'
import { dateTimeFormat, getUser, isLogin } from "../../utils/common"

export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [

            ],
            visible: false,
            shuoList: [],
            imgDomain: sessionStorage.getItem("imgDomain") || '',
            
        }
    }
    cancel = (value) => {
        this.setState({ visible: value })
    }
    getShuoList = async () => {
        let res = await _axios("get", "/api/normalShuo/getAll");
        this.setState({
            shuoList: res.result
        })
    }
    refresh = () => {
        this.getShuoList();
    }
    //点击发布按钮
    clickPublish = () => {
        if (isLogin()) {
            this.setState({ visible: true })
        } else {
            message.warning('未登录，即将跳转至登录页面');
            setTimeout(() => {
                this.props.history.push(`/login`)
            }, 1000)
        }
    }
    componentWillMount() {
     
    }
    componentDidMount() {
        this.getShuoList();
    }
    render() {
        const { shuoList } = this.state;
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
                        {
                            shuoList.map((item, index) => (
                                <div className="shuoshuo_item" key={index} >
                                    <div className='publisher' >
                                        <div className="publisher_head">
                                            <Avatar
                                                size={50}
                                                src={item.publisherId.portraitUrl}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="publisher_content" >
                                        <div className="publisher_name" >{item.publisherId.nickname}
                                            <span>发布于： {dateTimeFormat(item.meta.createdAt)}</span>
                                        </div>
                                        <div className="font">
                                            {item.content.text}
                                        </div>
                                        {item.content.imgs.length > 0 ?
                                            <ul className="imgs">
                                                {
                                                    item.content.imgs.map((item2, index2) => (
                                                        <li key={index2}  >
                                                            <img src={this.state.imgDomain + item2} />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            : null}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="poster_btn" onClick={this.clickPublish} >
                        <Icon type="plus" style={{ color: "#fff", fontSize: "20px" }} />
                    </div>
                </div>
                <NormalPublish visible={this.state.visible} onCancel={this.cancel} onRefresh={this.refresh} />
            </div>
        )
    }
}

export default Home;