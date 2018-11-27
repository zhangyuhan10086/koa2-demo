import "./discover.scss"
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import _axios from '../../utils/_axios'

class Discover extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player_list: []
        }
        // this.playerItemClick = this.playerItemClick.bind(this);
        //this.goUserHome = this.goUserHome.bind(this);
    }
    playerItemClick(e, name) {
        e.stopPropagation();
        console.log(name)
    }
    goUserHome = () => {
        console.log(this)
        this.props.history.push(`/userHome/111111`)
    }
    render() {
        return (
            <div className="discover_page" >
                <div className="discover_home">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540535643&di=c01bed8a1e94c6d7b0e633b7425d9523&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201709%2F22%2F20170922095117_Ze8rU.jpeg" />
                </div>
                <div className="filter_box" >
                    这里选择区服、职业,采用主页的组件即可
                </div>
                <div className="player_list" >
                    {
                        this.state.player_list.map((item, index) =>
                            <div className="player_item" key={index} onClick={this.goUserHome} >
                                <div className="protrait">
                                    <img src={item.portraitUrl} />
                                </div>
                                <div className="text" onClick={e => this.playerItemClick(e, item)}  >
                                    <p className="player_nick" >{item.username}</p>
                                    <p className="player_sex" >性别：{item.sex == 1 ? '汉子' : '妹子'}</p>
                                    <p className="player_summary" >简介：{item.summary}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
    async componentWillMount() {
        const res = await _axios("get", "http://localhost:4455/api/user/all", {});
        try {
            if (res.success) {
                let { users: userList } = res;
                this.setState({
                    player_list: userList
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default withRouter(Discover);