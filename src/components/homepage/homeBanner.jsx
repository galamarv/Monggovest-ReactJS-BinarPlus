import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselCaption
  } from 'reactstrap';


const items = [
  {
    src: 'http://monggovest.herokuapp.com/static/img/hero-bg.57f9674.jpg',
    altText: <h1>Semua Orang Bisa Berternak</h1>,
    caption: <text>Kelola keuangan anda dengan instrumen investasi yang terjangkau dan rendah resiko</text>
  }
];

class AppBanner extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }
    
  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="bg-img" src={item.src} alt={item.altText} />
          <CarouselCaption className="carousel-caption" captionText={item.caption} captionHeader={item.altText} />
        </CarouselItem>
      );
    });

    return (
        <Carousel className="bg-banner"
          activeIndex={activeIndex}
          
        > 
          {slides}
        </Carousel>
      );
    }
  }


export default AppBanner;