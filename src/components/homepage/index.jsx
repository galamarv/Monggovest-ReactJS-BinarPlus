import React, { Component } from 'react'
import AppHeader from '../common/AppHeader';
import HomeCarousel from './homeCarousel';
import HomeCard from './homeCard';
import HomeBanner from './homeBanner';


export default class Homepage extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <HomeBanner />
        <HomeCard />
      </div>
    )
  }
}
