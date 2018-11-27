import "./home.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navList: [

            ]
        }
    }
    componentWillMount(){
 
    }
    render() {
        return (
            <div className="home_page" >
                <div className="home_header" >
                    这里放网站公告、广告<br/>
                </div>
                <div className="filter_box" >
                    这里选择区服、职业
                </div>
                <div className="shuoshuo_wrap" >
                    这里放玩家发布的求cp、亲友、师徒信息,展示方式有点考虑
                </div>
            </div>
        )
    }
}

export default Home;