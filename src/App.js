import React from 'react';

import Carousel from './components/carousel/carousel.component';
import CustomButton from './components/custom-button/custom-button.component';
import DefaultIndicator from './components/indicator/indicator.component';

import './App.scss';

import slides from './constants/dummy-data';

const App = () => {
  return (
    <div className='app'>
      <Carousel
        rightButtonComponent={() => <CustomButton isRight />}
        leftButtonComponent={CustomButton}
        leftButtonProps={{ isLeft: true }}
        indicatorComponent={DefaultIndicator}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className='slide'
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          ></div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
