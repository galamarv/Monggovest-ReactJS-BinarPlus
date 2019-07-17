import React, { Component } from 'react'
import AppHeader from '../common/AppHeader';
import InvestBody from './InvesBody';

export default class InvestPage extends Component {
    render() {
        return (
            <div>
                <AppHeader />
                <InvestBody />
            </div>
        )
    }
}
