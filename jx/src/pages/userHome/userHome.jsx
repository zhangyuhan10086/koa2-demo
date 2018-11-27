import "./userHome.scss";
import React from "react";
import _axios from "../../utils/_axios"

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [

            ]
        }
    }
    render() {
        return (
            <div className="user_home">
                <div className="user_home_header">
                    用户信息区域
                </div>
                <div className="user_home_content">
                    <div className="one_talk">
                        <div className="publish_date">
                            2018/10/15
                        </div>
                        <div className="articl">
                            说的什么。哔哩哔哩比不了
                        </div>
                    </div>
                    <div className="one_talk">
                        <div className="publish_date">
                            2018/10/15
                        </div>
                        <div className="articl">
                            说的什么。哔哩哔哩比不了
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillMount() {
        console.log("props_222222",this.props)
        console.log("uid",this.props.match.params.uid)
    }
}

export default UserHome;