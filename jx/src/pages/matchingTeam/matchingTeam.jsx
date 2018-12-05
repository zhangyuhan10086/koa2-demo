import "./matchingTeam.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal, message } from "antd"
import { NormalPublish } from "../components/NormalPublish"
import _axios from '../../utils/_axios'
import { dateTimeFormat, getUser, isLogin } from "../../utils/common"

export class MatchingTeam extends React.Component {
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

        return (
            <div className="matchingTeam" >
                <div className="list_wrap">
                    <div className="teambox" style={{ backgroundImage: "url('http://piy3e9xq1.bkt.clouddn.com/FreYnTadmLRDyNbQMsk_giAwdTtt')" }} >
                        <div className="fb_description">
                            <h4>风雨稻香村</h4>
                            <div className="date">开本日期: 2018-7-1 18:00:00</div>
                            <p>这里放描述信息（比如 金团1w带老板 1等4 来dps 奶 t ）</p>
                        </div>
                        <div className="team_member_wrap">
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="member">

                            </div>
                            <div className="apply">
                                <Icon type="plus" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchingTeam;