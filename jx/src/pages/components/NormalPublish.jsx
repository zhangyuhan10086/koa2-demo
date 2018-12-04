import "./NormalPublish.scss";
import React from "react";
import { } from 'react-router-dom';
import { Modal, Input, Upload, Icon, Button, message } from "antd"
import _axios from '../../utils/_axios'

const { TextArea } = Input;

export class NormalPublish extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        previewVisible: false,
        previewImage: '',           //要预览的大图
        fileList: [],
        token: sessionStorage.getItem("qiniuToken"),
        text: "",        //输入的文本内容
        submitLoading: false
    }
    //浏览大图
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    //关闭弹框
    handleCancel = (e) => {
        this.props.onCancel(false)
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
    //提交发布
    submit = async (e) => {
        let imgs = this.state.fileList.map(item => {
            if (item.response && item.response.key) {
                return item.response.key
            }
        })
        let postData = {
            text: this.state.text,
            imgs
        };
        if(!this.state.text){
            message.warning('不能发布空白内容');
            return false;
        }
        this.setState({
            submitLoading: true
        })
        let res = await _axios("post", "/api/normalShuo/publish", postData);
        if (res.success) {
            this.props.onRefresh();
            message.success('发布成功');
            setTimeout(() => {
                this.state.fileList = [];
                this.state.text = "";
                this.handleCancel();
                this.setState({
                    submitLoading: false
                })
            }, 1000)
        }
    }
    changeContent = (value) => {
        this.setState({
            text: value
        })
    }

    componentWillMount() {

    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const data = {
            token: this.state.token
        }
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Modal
                title="发布"
                width="800px"
                visible={this.props.visible}
                onCancel={this.handleCancel}
                className="normal_publish"
                footer={null}
            >
                <div >
                    <div className="h3">想说的话</div>
                    <TextArea rows={4} value={this.state.text} onChange={e => this.changeContent(e.target.value)} />
                    <div className="upload_item clearfix">
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
                    </div>
                    <div className="btns">
                        <Button onClick={this.submit} loading={this.state.submitLoading} >提交</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default NormalPublish;