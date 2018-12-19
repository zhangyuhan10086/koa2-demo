import "./setting.scss";
import React from "react";
import { Upload, Radio, Icon, Input, Button, message, Slider } from "antd"
import _axios from '../../utils/_axios'
import axios from "axios"
import PropTypes from 'prop-types';
import { resetUserInfo } from "../../store/user/action"
import { connect } from 'react-redux';

import { setCookie, delCookie } from "../../utils/common"
import AvatarEditor from 'react-avatar-editor'
const RadioGroup = Radio.Group;

export class Publish extends React.Component {
    constructor(props) {
        super(props)

    }
    static propTypes = {
        resetUserInfo: PropTypes.func.isRequired,
    }
    state = {
        token: sessionStorage.getItem("qiniuToken"),
        formData: {
            nickName: '',         //昵称
            sex: ''
        },
        submitLoading: false,
        scale: 1,        //封面裁剪缩放值
        coverImg: "",           //封面图
        willSaveCover: '',       //要保存的封面图
        imgDomain: sessionStorage.getItem("imgDomain") || '',
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
            this.setState({
                coverImg: null,
                willSaveCover: res.data.key
            })
        })

    }
    //保存
    submit = async (e) => {
        let postData = {
            headerImg: this.state.willSaveCover,
            nickName: this.state.formData.nickName,
            sex: this.state.formData.sex,
        };
        if (!postData.headerImg) {
            message.warning('头像不能为空');
            return false;
        }
        this.setState({
            submitLoading: true
        });
        let res = await _axios("post", "/api/user/update", postData);
        this.setState({
            submitLoading: false
        });
        if (res.success) {
            message.success('保存成功');
            //重置用户信息
            this.getUserInfo();
        }
    }

    //长传封面
    coverChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            console.log(`${info.file.name} file uploaded successfully`);
            this.setState({
                coverImg: info.file.response.key,
                willSaveCover: null
            })
        } else if (info.file.status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    }
    //选择性别
    radioChange = (value) => {
        let { formData } = this.state;
        formData.sex = value;
        this.setState({
            formData
        })
    }
    //获取用户信息
    getUserInfo = async () => {
        try {
            let res = await _axios("get", "/api/user/userInfo");
            if (res.success) {
                setCookie('user', JSON.stringify(res.result), 1);
                let formData = {
                    nickName: res.result.nickname,
                    sex: res.result.sex,
                }
                this.setState({
                    formData,
                    willSaveCover: res.result.portraitUrl
                });
                const { nickname, portraitUrl, roleCode, sex, username, _id } = res.result;
                this.props.resetUserInfo(
                    { nickname, portraitUrl, roleCode, sex, username, _id }
                )
            } else {
                console.log(res.remark)
            }
        } catch (err) {
            console.log(err)
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.getUserInfo();
    }
    render() {
        const data = {
            token: this.state.token
        }
        const { imgDomain, formData } = this.state;

        return (
            <div className="setting_page">
                <div className="publish_inner">
                    <div className="modal_header" >个人资料</div>
                    <div className="modal_inner" >
                        <div className="cover_btns_t" >
                            <Upload
                                action="http://up-z2.qiniup.com"
                                onChange={this.coverChange}
                                data={data}
                                showUploadList={false}
                            >
                                <Button>
                                    <Icon type="upload" />更换头像
                                </Button>
                            </Upload>
                        </div>
                        <div className="cover_c" >
                            {!this.state.willSaveCover ?
                                <AvatarEditor
                                    ref={this.setEditorRef}
                                    crossOrigin='anonymous'
                                    image={imgDomain + this.state.coverImg}
                                    width={100}
                                    height={100}
                                    border={20}
                                    borderRadius={50}
                                    color={[255, 255, 255, 0.6]} // RGBA
                                    scale={this.state.scale}
                                    rotate={0}
                                /> :
                                <img className="cover_show_img" src={imgDomain + this.state.willSaveCover} alt="" />
                            }
                        </div>
                        {this.state.coverImg ?
                            <div className="cover_btns" >
                                <div className="cover_btns_i" >
                                    <Slider
                                        onChange={this.sliderChange}
                                        min={1}
                                        max={8}
                                        step={0.01}
                                        value={this.state.scale}
                                        style={{ width: 280, }}
                                    />
                                </div>
                                <div className="cover_btns_i"  >
                                    <Button type="primary" onClick={this.coverSave} >保存</Button>
                                </div>
                            </div> : null
                        }
                        <div className="inputList">
                            <div className="input_item_wrap">
                                <div className="input_name">
                                    昵称
                                </div>
                                <div className="input_item">
                                    <Input onChange={e => this.inputChange(e.target.value, 'nickName')} value={formData.nickName} />
                                </div>
                            </div>
                            <div className="input_item_wrap">
                                <div className="input_name">
                                    性别
                                </div>
                                <div className="input_item">
                                    <RadioGroup onChange={e => this.radioChange(e.target.value)} value={formData.sex} >
                                        <Radio value={'1'}>男</Radio>
                                        <Radio value={'2'}>女</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit_btn_wrap" >
                    <Button type="primary" onClick={this.submit} loading={this.state.submitLoading}  >保存</Button>
                </div>

            </div>
        )
    }
}

export default connect(
    //connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])  
    // 只要store更新了就会调用mapStateToProps方法，
    state => {
        return {
            test2: state.userInfo
        }
    },
    {
        resetUserInfo
    }
    // dispatch => {

    //     // return {
    //     //     newResetUserInfo: (name) => {
    //     //         console.log(name)
    //     //         resetUserInfo(dispatch, name)
    //     //     }
    //     // }
    //     // return {
    //     //     newResetUserInfo: (name) => {
    //     //         dispatch({
    //     //             type: 'USERINFORESTD',
    //     //             data: {
    //     //                 name
    //     //             }
    //     //         })
    //     //     }
    //     // }
    // }

)(Publish);