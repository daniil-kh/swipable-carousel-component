# Carousel Component

---

## Installation

Clone repository

`npm install`

Create `dist` folder
Create `bundle.js` in `dist` folder

`npm run build`

## Usage

```JavaScript
import React from 'react';

import Carousel from './components/carousel/carousel.component';
import CustomButton from './components/custom-button/custom-button.component';
import DefaultIndicator from './components/indicator/indicator.component';

import './App.scss';

import slides from './constants/dummy-data';

const App = () => {
  console.log(slides);
  return (
    <div className='app'>
      <Carousel
        rightButtonComponent={CustomButton}
        rightButtonProps={{ isRight: true }}
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
```

## Customizing

##### Slides

By default, each slide will be rendered as passed as children in order that they passed.

##### Left/Right button

By default, carousel use it own buttons, but you can provide your own components to Left/Right button, on-click callback and props

```
rightButtonComponent: React.reactNode?;
rightButtonCallback: Function?;
rightButtonProps: Object?;
leftButtonComponent: React.reactNode?;
leftButtonCallback: Function?;
leftButtonProps: Object?;
```

##### Indicators

By default, carousel use it own indicator, but you can provide your own components to indicators, on-click callback and props

```
indicatorComponent: React.reactNode?;
indicatorCallback: Function?;
indicatorProps: Object?;
```

---
