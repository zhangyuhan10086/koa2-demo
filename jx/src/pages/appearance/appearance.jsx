import "./appearance.scss";
import React from "react";
import { Select, Icon, message, Input, Button, Pagination } from "antd"
import _axios from '../../utils/_axios'
import { dateTimeFormat, boySizeMap, isLogin, } from "../../utils/common"

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
            limit: 9,        //每页条数
            currentPage: 1,     //当前页数
            total: 0,           //总页数
            keyword: '',     //关键字
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
    //关键字双向
    keywordChange = (value) => {
        this.setState({
            keyword: value
        })
    }
    //获取列表
    getList = async (page) => {
        let res = await _axios("get", "/api/appearance/getAll", {
            start: page,
            limit: this.state.limit,
            keyword: this.state.keyword
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({
            listData: res.result.results,
            total: res.result.total,
            currentPage: res.result.currentPage
        })
    }
    //打开大图弹框
    openModal = (item) => {
        this.childModal.resetIndex();
        this.childModal.openModal(item);
        this.setState(
            {
                showMoadl: true
            }
        )
    }
    //关闭弹框
    onClose = (value) => {
        this.setState({
            showMoadl: value
        })
    }
    onRef = (ref) => {
        this.childModal = ref
    }
    //选择体型
    selectBoySize = (value) => {
        console.log(value)
    }
    //翻页
    selectPage = (page) => {
        this.getList(page)
    }
    //搜索
    search = () => {
        this.getList(1)
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.getList(this.state.currentPage);
    }
    render() {
        const { Option } = Select;
        const { listData, imgDomain, total, limit, currentPage } = this.state;

        return (
            <div className="appearance_list" >
                <div className="search_items" >
                    <Select defaultValue="" style={{ width: '130px' }} onChange={this.selectBoySize}>
                        {
                            boySizeMap.map((option, index) => (
                                <Option value={option.key} key={index} >{option.label}</Option>
                            ))
                        }
                    </Select>
                    <Input value={this.state.keyword} onChange={e => this.keywordChange(e.target.value)} placeholder="关键字" style={{ width: '330px', marginLeft: "20px" }} />
                    <Button style={{ marginLeft: "20px" }} onClick={this.search} >搜索</Button>
                </div>
                <div className="list_wrap">
                    {
                        listData.map((item, index) => (
                            <div className="appearance_item" onClick={() => this.openModal(item)} key={index} style={{ backgroundImage: `url(${imgDomain + item.cover})` }} >
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
                                    {
                                        item.reply.map((replyItem, index2) => {
                                            if (index2 <= 1) {
                                                return (
                                                    <div className="comment_item" key={index2} >
                                                        <div className="reply_au">{replyItem.replyId.nickname}：</div>
                                                        <div className="reply_font">{replyItem.replyContent}</div>
                                                    </div>
                                                )
                                            }
                                        })

                                    }
                                    {
                                        item.reply.length > 2 ? <div className="more" >. . . <span>{item.reply.length}条评论</span>   </div> : null
                                    }
                                    {
                                        item.reply.length == 0 ? <div className="more" >暂无评论</div> : null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="pagination" >
                    <Pagination onChange={this.selectPage} current={currentPage} pageSize={limit} total={total} />
                </div>
                <div className="poster_btn" onClick={this.toPublish} >
                    <Icon type="plus" style={{ color: "#fff", fontSize: "20px" }} />
                </div>
                <CSSTransition
                    in={this.state.showMoadl}
                    classNames="fade"
                    timeout={500}
                    onEnter={(el) => {
                        el.style.display = 'flex';
                        document.body.classList.add("body-fixed", 'scroll-fixed');
                    }}
                    onExited={(el) => {
                        el.style.display = 'none';
                        document.body.classList.remove("body-fixed", 'scroll-fixed');
                    }}
                >
                    <AppearanceModal onRef={this.onRef} onClose={this.onClose} />
                </CSSTransition>
            </div>
        )
    }
}

export default Appearance;