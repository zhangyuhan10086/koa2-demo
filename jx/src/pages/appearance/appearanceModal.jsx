import "./appearanceModal.scss";
import React from "react";
import { Icon, message, Avatar, Input, Button } from "antd"
import _axios from '../../utils/_axios'
import { dateTimeFormat } from "../../utils/common"
import PropTypes from 'prop-types';

export class AppearanceModal extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        imgDomain: sessionStorage.getItem("imgDomain") || '',
        currentIndex: 0,
        replyContent: '',
        modalData: null,     //弹窗的数据
        replyLoading: false
    }
    //切换图片
    changeCurrentIndex = (value) => {
        let { currentIndex } = this.state;
        if (currentIndex + value < 0 || currentIndex + value >= this.state.modalData.imgList.length) {
            return false;
        };
        let index = currentIndex + value;
        this.setState({
            currentIndex: index
        })
    }
    //关闭弹框
    close = () => {
        this.props.onClose(false)
    }
    //重置
    resetIndex = () => {
        this.setState({
            currentIndex: 0,
        })
    }
    //打开弹框
    openModal = (data) => {
        if (data.imgList.indexOf(data.cover) < 0) {
            data.imgList.unshift(data.cover)
        }
        this.setState({
            modalData: data
        });
        this.getDetail(data._id)
    }
    //获取详情
    getDetail = async (id) => {
        let res = await _axios("get", "/api/appearance/detail", { id });
        if (res.success) {
            let data = res.result[0];
            if (data.imgList.indexOf(data.cover) < 0) {
                data.imgList.unshift(data.cover)
            }
            this.setState({
                modalData: data,
            }, () => {

            });
        }
    }
    //发表回复
    replySubmit = async () => {
        let postData = {
            id: this.state.modalData._id,
            replyContent: this.state.replyContent
        };
        this.setState({
            replyLoading: true
        })
        let res = await _axios("post", "/api/appearance/reply", postData);
        this.setState({
            replyLoading: false
        })
        if (res.success) {
            this.getDetail(this.state.modalData._id);
            this.setState({
                replyContent: ''
            })
        }
    }
    //表单绑定
    inputChange = (value) => {
        this.setState({
            replyContent: value
        })
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        let { modalData } = this.state;

        const { TextArea } = Input;
        let authorHeaderUrl = modalData ? modalData.publisherId.portraitUrl : null
        let { currentIndex } = this.state
        return (
            <div className="appearance_modal" >
                <div className="exhibition_big_pic">
                    {
                        modalData ?
                            modalData.imgList.map((item, index) => {
                                if (currentIndex == index) {
                                    return <img src={this.state.imgDomain + item} key={index} />
                                }
                            })
                            : null
                    }
                    <div className="arrow_l" >
                        <Icon type="arrow-left" onClick={() => this.changeCurrentIndex(-1)} />
                    </div>
                    <div className="arrow_r" >
                        <Icon type="arrow-right" onClick={() => this.changeCurrentIndex(1)} />
                    </div>

                </div>
                <div className="right_control">
                    <h2>发布者</h2>
                    <div className="author">
                        <Avatar
                            size="large"
                            src={authorHeaderUrl}
                        />
                        <div className="nick_name">
                            <span>{modalData ? modalData.publisherId.nickname : null}</span>
                            <span>{modalData ? dateTimeFormat(modalData.meta.createdAt) : null}</span>
                        </div>
                    </div>
                    <h3>评论({modalData ? modalData.reply.length : 0})</h3>
                    <div className="reply_list">
                        {
                            modalData ? modalData.reply.map((item, index) => (
                                <div className="reply_item" key={index} >
                                    <div className="who">
                                        <span>{item.replyId.nickname} </span>
                                        <span>{dateTimeFormat(item.createdAt)} {index + 1}楼</span>
                                    </div>
                                    <div className="say_what">
                                        {item.replyContent}
                                    </div>
                                </div>
                            )) : null
                        }
                    </div>
                    <div className="reply">
                        <TextArea autosize={{ minRows: 3 }} value={this.state.replyContent} maxLength={200} onChange={e => this.inputChange(e.target.value)} />
                        <Button style={{ marginTop: "10px" }} onClick={this.replySubmit} loading={this.state.replyLoading} >发表</Button>
                    </div>
                </div>
                <div className="close_modal" onClick={this.close} >
                    <Icon type="close" />
                </div>
            </div>
        )
    }
}

export default AppearanceModal;