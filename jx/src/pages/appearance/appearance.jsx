import "./appearance.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal, message } from "antd"
import _axios from '../../utils/_axios'
import { dateTimeFormat, getUser, isLogin } from "../../utils/common"

import { CSSTransition } from 'react-transition-group';

import AppearanceModal from "./appearanceModal"

const xinImg = require('../../statics/xin.svg')
const xin2Img = require('../../statics/xinshi.svg')

export class Appearance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            listData: [],
            imgDomain: sessionStorage.getItem("imgDomain") || '',
            showMoadl: false,
        }
    }
    cancel = (value) => {
        this.setState({ visible: value })
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
    //获取列表
    getList = async () => {
        let res = await _axios("get", "/api/appearance/getAll");
        this.setState({
            listData: res.result
        })
    }
    //打开大图弹框
    openModal = () => {
        this.setState({
            showMoadl: true
        })
    }
    //关闭弹框
    onClose = (value) => {
        this.setState({
            showMoadl: value
        })
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getList();
    }
    render() {
        const { listData, imgDomain } = this.state;
        return (
            <div className="appearance_list" >
                <div className="list_wrap">
                    {
                        listData.map((item, index) => (
                            <div className="appearance_item" onClick={this.openModal} key={index} style={{ backgroundImage: `url(${imgDomain + item.cover})` }} >
                                <div className="au_description">
                                    <h4>
                                        <span>{item.appearanceTitle}</span>
                                        <span>By  {item.publisherId.nickname}</span>
                                    </h4>
                                    <div className="date">
                                        <span>发布日期：{dateTimeFormat(item.meta.createdAt)}</span>
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
                        ))
                    }
                </div>
                <div className="poster_btn" onClick={this.toPublish} >
                    <Icon type="plus" style={{ color: "#fff", fontSize: "20px" }} />
                </div>
                <CSSTransition
                    in={this.state.showMoadl}
                    classNames="fade"
                    timeout={500}
                    onEnter={(el) => {
                        el.style.display = 'flex'
                    }}
                    onExited={(el) => {
                        el.style.display = 'none'
                    }}
                >
                    <AppearanceModal onClose={this.onClose} />
                </CSSTransition>
            </div>
        )
    }
}

export default Appearance;