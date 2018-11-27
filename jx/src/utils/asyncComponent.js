import React from "react";
import Loading from "../pages/loading/loading"
export default (loadComponent,placeholder="正在加载中") =>{
    return class AsyncComponent extends React.Component{
        unmount=true;
        constructor(props){
            super(props)
            this.state={
                component:null,
            }
        }
        componentWillMount(){
            this.unmount=false;
        }
        async componentDidMount(){
            const  { default:component } =  await loadComponent();
            if(this.unmount) return
            this.setState({
                component
            })
        }
        render(){
            const C= this.state.component
            return ( C? <C  {...this.props}  /> :  <Loading />)
        }
    }
}