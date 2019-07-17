import React, { Component } from 'react'
import AppHeader from '../common/AppHeader';
import Axios from 'axios';

export default class InvestDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      detail: {}
    }
  }

  componentDidMount(){
    Axios.get(`http://localhost:6780/api/user/komoditas/${this.props.match.params.investId}`)
    .then(res => {
      this.setState({
        detail : res.data.result[0]
      })
    })
  }

  render() {
    console.log('ini id', this.props.match.params.investId)
    console.log('ini detail', this.state.detail)
    const { nama_ternak, foto } = this.state.detail
    return (
      <div>
        <AppHeader />
        <div>
            <h3>{nama_ternak}</h3>
            <img src={foto} alt="" srcset=""/>
        </div>
      </div>
    )
  }
}
