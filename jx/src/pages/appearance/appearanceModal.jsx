import "./appearanceModal.scss";
import React from "react";
import { Icon } from "antd"
import _axios from '../../utils/_axios'
import { } from "../../utils/common"
import PropTypes from 'prop-types';

export class AppearanceModal extends React.Component {
    constructor(props) {
        super(props)
    }

    close_modal = () => {

    }

    componentWillMount() {

    }
    componentDidMount() {

    }
    render() {
        const { onClose } = this.props
        return (
            <div className="appearance_modal" >
                <div className="exhibition_big_pic">
                    <img src="http://piy3e9xq1.bkt.clouddn.com/FigHgx7KbWmFsaVcp2mu-sWFGOdN" alt="" />
                    <Icon className="arrow_l" type="arrow-left" />
                    <Icon className="arrow_r" type="arrow-right" />
                </div>
                <div className="right_control">
                    按钮
                </div>
                <div className="close_modal" onClick={() => onClose(false)} >
                    <Icon type="close" />
                </div>
            </div>
        )
    }
}

export default AppearanceModal;