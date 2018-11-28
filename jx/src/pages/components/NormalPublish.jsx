import "./NormalPublish.scss";
import React from "react";
import { } from 'react-router-dom';
import { Modal, Input, Upload, Icon } from "antd"
const { TextArea } = Input;

export class NormalPublish extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        previewVisible: false,
        previewImage: '',           //要预览的大图
        fileList: [{          //上传的图片
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    }
    //
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
        console.log("file",file)
        console.log("fileList",fileList)
        this.setState({ fileList });

    }
    //关闭浏览大图弹框
    previewImgCancel = (e) => {
        this.setState(
            { previewVisible: false }
        )
    }

    componentWillMount() {

    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
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
                    <TextArea rows={4} />
                    <div className="upload_item clearfix">
                        <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}>
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={this.previewImgCancel}
                            width="800px" >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default NormalPublish;