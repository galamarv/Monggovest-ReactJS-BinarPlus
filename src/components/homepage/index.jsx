import React, { Component } from 'react'
import AppHeader from '../common/AppHeader';
import HomeCarousel from './homeCarousel';
import HomeCard from './homeCard';

export default class Homepage extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <HomeCarousel />
        <HomeCard />
      </div>
    )
  }
}
