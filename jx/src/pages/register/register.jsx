import "./register.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message } from 'antd';
import _axios from '../../utils/_axios'

const FormItem = Form.Item;

class registerForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        confirmDirty: false,
    };
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await _axios("post", "http://localhost:4455/api/user/register", values);
                try {
                    if (res.success) {
                        message.success('注册成功!即将去登录页面');
                        setTimeout(() => {
                            this.props.history.push(`/login`)
                        }, 2000)

                    } else {
                        message.error(res.remark);
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        })
    }
    goLogin = () => {
        this.props.history.push(`/login`)
    }
    validateUserName(rule, value, callback) {
        let reg = /^[a-zA-Z0-9]{8,16}$/;
        if (!value) {
            callback("请输入账号！")
        } else {
            if (!reg.test(value)) {
                callback("账号字母或数字，8-16位组成！")
            } else {
                callback();
            }
        }
    }
    validatePassword(rule, value, callback) {
        let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/;
        if (!value) {
            callback("请输入密码！")
        } else {
            if (!reg.test(value)) {
                callback("密码由大写字母+小写字母+数字，8-16位组成！")
            } else {
                callback();
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 18,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 0,
                },
            },
        };

        return (
            <Form onSubmit={this.submit} className="register_from" >
                <FormItem
                    {...formItemLayout}
                    label="账号">
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, validator: this.validateUserName,
                        },],
                    }, )(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, validator: this.validatePassword,
                        },],
                    })(
                        <Input type="password" />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    {...tailFormItemLayout}
                    colon={false}
                    label="&nbsp;"
                >
                    <Button type="primary" htmlType="submit">注册</Button>
                    <Button type="primary" style={{ marginLeft: "20px" }} onClick={this.goLogin} >去登录</Button>
                </FormItem>
            </Form>
        )
    }
}
const WrapregisterForm = Form.create()(registerForm)

export default withRouter(WrapregisterForm);



