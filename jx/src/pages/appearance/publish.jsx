import "./publish.scss";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Avatar, Icon, Modal, message } from "antd"
import _axios from '../../utils/_axios'
import { dateTimeFormat, getUser, isLogin } from "../../utils/common"

const xinImg = require('../../statics/xin.svg')
const xin2Img = require('../../statics/xinshi.svg')

export class Publish extends React.Component {
    constructor(props) {
        super(props)

    }

    refresh = () => {
        this.getShuoList();
    }

    componentWillMount() {

    }
    componentDidMount() {
        
    }
    render() {

        return (
            <div></div>
        )
    }
}

export default Publish;