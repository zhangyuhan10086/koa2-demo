import "./publish.scss";
import React from "react";
import { Upload, Modal, Icon, Input, Button, message, Slider } from "antd"
import _axios from '../../utils/_axios'
import axios from "axios"

import { dateTimeFormat, getUser, isLogin } from "../../utils/common"
import AvatarEditor from 'react-avatar-editor'

const xinImg = require('../../statics/xin.svg')
const xin2Img = require('../../statics/xinshi.svg')

export class Publish extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {
        previewVisible: false,
        previewImage: '',           //要预览的大图
        fileList: [],       //上传图
        token: sessionStorage.getItem("qiniuToken"),
        formData: {
            appearanceTitle: '',         //外观标题
        },
        submitLoading: false,
        scale: 1,        //封面裁剪缩放值
    }
    refresh = () => {
        this.getShuoList();
    }
    //浏览大图
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    //图片有变回的回调
    handleChange = ({ fileList, file, event }) => {
        this.setState({ fileList });
    }
    //关闭浏览大图弹框
    previewImgCancel = (e) => {
        this.setState(
            { previewVisible: false }
        )
    }
    //表单绑定
    inputChange = (value, key) => {
        let { formData } = this.state
        formData[key] = value || null;
        this.setState({
            formData
        })
    }
    //裁剪缩放
    sliderChange = (value) => {
        this.setState({
            scale: value
        })
    }
    setEditorRef = editor => {
        if (editor) this.editor = editor
    }

    //保存封面
    coverSave = async (data) => {
        let img = this.editor.getImageScaledToCanvas().toDataURL();
        let picBase = img.substring(22);
        const { token } = this.state;
        /*通过base64编码字符流计算文件流大小函数*/
        function fileSize(str) {
            var fileSize;
            if (str.indexOf('=') > 0) {
                var indexOf = str.indexOf('=');
                str = str.substring(0, indexOf);//把末尾的’=‘号去掉
            }

            fileSize = parseInt(str.length - (str.length / 8) * 2);
            return fileSize;
        };
        let url = 'http://up-z2.qiniup.com/putb64/' + fileSize(picBase);
        axios({
            method: 'post',
            url: url,
            headers: { 'Content-Type': 'application/octet-stream', 'Authorization': 'UpToken ' + token },
            data: picBase
        }).then((res) => {
            console.log(res)
        })
        // let res = await _axios("post", url, {
        //     token: this.state.token,
        //     pic: img
        // });
        // console.log(res);
    }
    //提交发布
    submit = async (e) => {
        let imgs = this.state.fileList.map(item => {
            if (item.response && item.response.key) {
                return item.response.key
            }
        })
        let postData = {
            cover: "http://piy3e9xq1.bkt.clouddn.com/FrPxSlEFS35bArq9YbZUxMqBXtwq",
            imgList: imgs,
            appearanceTitle: this.state.formData.appearanceTitle,
            appearanceName: this.state.formData.appearanceName,
        };
        if (!postData.cover) {
            message.warning('封面不能为空');
            return false;
        }
        if (!postData.appearanceTitle) {
            message.warning('标题不能为空');
            return false;
        }
        this.setState({
            submitLoading: true
        });
        console.log(postData)
        let res = await _axios("post", "/api/appearance/publish", postData);
        this.setState({
            submitLoading: false
        })
        if (res.success) {
            message.success('发布成功');
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    render() {
        const data = {
            token: this.state.token
        }
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="zhongcao_waiguan">
                <div className="publish_inner">
                    <div className="modal_header" >分享外观</div>
                    <div className="modal_inner" >
                        <AvatarEditor
                            ref={this.setEditorRef}
                            crossOrigin='anonymous'
                            image="http://piy3e9xq1.bkt.clouddn.com/FrPxSlEFS35bArq9YbZUxMqBXtwq"
                            width={360}
                            height={480}
                            border={50}
                            color={[255, 255, 255, 0.6]} // RGBA
                            scale={this.state.scale}
                            rotate={0}
                        />
                        <div className="cover_btns" >
                            <Slider
                                onChange={this.sliderChange}
                                min={1}
                                max={2}
                                step={0.01}
                                value={this.state.scale}
                                style={{ width: 280, }}
                            />
                            <Button type="primary" onClick={this.coverSave} >保存</Button>
                        </div>
                        <Upload
                            action="http://up-z2.qiniup.com"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            data={data}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={this.previewImgCancel}
                            width="800px" >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        <div className="inputList">
                            <div className="input_item_wrap">
                                <div className="input_name">
                                    标题
                            </div>
                                <div className="input_item">
                                    <Input onChange={e => this.inputChange(e.target.value, 'appearanceTitle')} />
                                </div>
                            </div>
                            <div className="input_item_wrap">
                                <div className="input_name">
                                    外观名称
                            </div>
                                <div className="input_item">
                                    <Input onChange={e => this.inputChange(e.target.value, 'appearanceName')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit_btn_wrap" >
                    <Button type="primary" onClick={this.submit} loading={this.state.submitLoading}   >提交发布</Button>
                </div>

            </div>
        )
    }
}

export default Publish;