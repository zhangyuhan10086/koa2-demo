import "./login.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import _axios from '../../utils/_axios'

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        loading: false,
    }
    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                let res = await _axios("post", "/api/user/login", values);
                this.setState({
                    loading: false
                })
                if (res.success) {
                    this.props.history.push(`/home`);
                } else {
                    message.error(res.remark);
                }
            }
        })
    }
    goRegister = () => {
        this.props.history.push(`/register`)
    }
    async componentWillMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.submit} className="main_login_form" >
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, max: 18, message: '请填写您的账号' }
                        ]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请填写您的密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住账号</Checkbox>
                        )}
                    <a className="login-form-forgot" >忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}  >
                        登录
                    </Button>
                    Or <a onClick={this.goRegister} >立即注册!</a>
                </FormItem>
            </Form>
        )
    }
}
const WrapLoginForm = Form.create()(LoginForm)

export default withRouter(WrapLoginForm);

// export default WrapLoginForm;



