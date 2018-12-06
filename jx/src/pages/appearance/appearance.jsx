import "./appearance.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal, message } from "antd"
import _axios from '../../utils/_axios'
import { dateTimeFormat, getUser, isLogin } from "../../utils/common"

const xinImg = require('../../statics/xin.svg')
const xin2Img = require('../../statics/xinshi.svg')

export class Appearance extends React.Component {
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
    //去发布页面
    toPublish = () => {
        this.props.history.push(`/publish`)
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getShuoList();
    }
    render() {

        return (
            <div className="appearance_list" >
                <div className="list_wrap">
                    <div className="appearance_item" style={{ backgroundImage: "url('http://piy3e9xq1.bkt.clouddn.com/FrPxSlEFS35bArq9YbZUxMqBXtwq')" }} >
                        <div className="au_description">
                            <h4>
                                <span>外观名称</span>
                                <span>By zhangyuhan</span>
                            </h4>
                            <div className="date">
                                <span>发布日期：2018-7-1 18:00:00</span>
                                <div className="praise">
                                    <div className="heart">
                                        <span>1111</span>
                                        <img src={xinImg} alt="" />
                                        <img src={xin2Img} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comment_wrap">
                            <div className="comment_item">
                                <div className="reply_au">长明宇:</div>
                                <div className="reply_font">这个外观真好看</div>
                            </div>
                            <div className="comment_item">
                                <div className="reply_au">杀伐:</div>
                                <div className="reply_font">土豪土豪啊啊啊啊啊土豪土豪啊啊啊啊啊土豪土豪啊啊啊啊啊土豪土豪啊啊啊啊啊土豪土豪啊啊啊啊啊土豪土豪啊啊啊啊啊</div>
                            </div>
                            <div className="more" >. . .</div>
                        </div>
                    </div>
                </div>
                <div className="poster_btn" onClick={this.toPublish} >
                    <Icon type="plus" style={{ color: "#fff", fontSize: "20px" }} />
                </div>
            </div>
        )
    }
}

export default Appearance;