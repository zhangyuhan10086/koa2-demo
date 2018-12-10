import "./loading.scss";
import React from "react";
import { Icon } from "antd";
export class Loading extends React.Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {

    }
    render() {
        return (
            <div className="loading_c" >
                <Icon type="loading" style={{ fontSize:"80px",color:"#ff6fa2" }} />
            </div>
        )
    }
}

export default Loading;