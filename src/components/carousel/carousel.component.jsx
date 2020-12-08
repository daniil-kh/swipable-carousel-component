import React, { useState, useEffect, useRef, useCallback } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import DefaultIndicator from '../indicator/indicator.component';

import './carousel.style.scss';

const Carousel = (props) => {
  const {
    children,
    countOfSlides,
    rightButtonComponent,
    leftButtonComponent,
    rightButtonCallback,
    leftButtonCallback,
    rightButtonProps,
    leftButtonProps,
    indicatorComponent,
    indicatorCallback,
    indicatorProps,
  } = props;

  const RightButton = rightButtonComponent
    ? rightButtonComponent
    : CustomButton;

  const LeftButton = leftButtonComponent ? leftButtonComponent : CustomButton;

  const Indicator = indicatorComponent ? indicatorComponent : DefaultIndicator;

  const [currentSlide, setCurrentSlide] = useState(0);

  const left = useRef(0);
  const slide = useRef(null);
  const startTime = useRef(Date.now());
  const fpsInterval = useRef(10);
  const dragged = useRef(false);
  const dragStartX = useRef(0);
  const slideDefaultPosition = useRef(null);
  const threshold = 0.4;

  const rightClickHandler = useCallback(() => {
    setCurrentSlide((prevState) => {
      if (prevState === children.length - 1) return 0;
      return prevState + 1;
    });
    rightButtonCallback ? rightButtonCallback() : null;
  }, [children, rightButtonCallback]);
  const leftClickHandler = useCallback(() => {
    setCurrentSlide((prevState) => {
      if (prevState === 0) return children.length - 1;
      return prevState - 1;
    });
    leftButtonCallback ? leftButtonCallback() : null;
  }, [children, leftButtonCallback]);

  const indicatorClickHandler = useCallback(
    (numberOfSlide) => {
      setCurrentSlide(numberOfSlide);
      indicatorCallback ? indicatorCallback() : null;
    },
    [children, indicatorCallback]
  );

  const indicators = children.map(({ key }) => {
    return (
      <Indicator
        key={Number(key)}
        isActive={Number(key) === currentSlide}
        onClick={() => indicatorClickHandler(Number(key))}
        additionalProps={{ ...indicatorProps }}
      />
    );
  });

  const onDragStartMouse = (event) => {
    onDragStart(event.clientX);
    slide.current.addEventListener('mousemove', onMouseMove);
  };
  const onMouseMove = useCallback(
    (event) => {
      const newLeft = event.clientX - dragStartX.current;
      if (Math.abs(newLeft) <= slide.current.offsetWidth / 2)
        left.current = newLeft;
    },
    [left, dragStartX]
  );
  const onDragStartTouch = (event) => {
    const touch = event.targetTouches[0];
    onDragStart(touch.clientX);
    slide.current.addEventListener('touchmove', onTouchMove);
  };
  const onTouchMove = useCallback(
    (event) => {
      const touch = event.targetTouches[0];
      const newLeft = touch.clientX - dragStartX.current;
      if (Math.abs(newLeft) <= slide.current.offsetWidth / 2)
        left.current = newLeft;
    },
    [left, dragStartX]
  );
  const onDragEndMouse = (event) => {
    onDragEnd();
  };
  const onDragEndTouch = (event) => {
    onDragEnd();
  };
  const onDragEnd = () => {
    slide.current.removeEventListener('mousemove', onMouseMove);
    slide.current.removeEventListener('touchmove', onTouchMove);
    slide.current.style.transform = `translateX(0px)`;
    dragStartX.current = 0;
    slide.current.style.opacity = 1;

    if (dragged.current) {
      dragged.current = false;
      if (left.current < slide.current.offsetWidth * threshold * -1) {
        left.current = 0;
        onSwiped(leftClickHandler);
      } else if (left.current > slide.current.offsetWidth * threshold) {
        left.current = 0;
        onSwiped(rightClickHandler);
      }
      slide.current.classList.add('bounce');
    }
    left.current = 0;
  };
  const onDragStart = (clientX) => {
    dragged.current = true;
    dragStartX.current = clientX;

    slide.current.className = 'slide-wrapper';
    requestAnimationFrame(updatePosition);
  };
  const updatePosition = () => {
    if (dragged.current) requestAnimationFrame(updatePosition);

    const now = Date.now();
    const elapsed = now - startTime.current;

    if (dragged.current && elapsed > fpsInterval.current) {
      slide.current.style.transform = `translateX(${left.current}px)`;
      const opacity = 1 - (Math.abs(left.current) / 100).toFixed(2);
      if (opacity < 1 && opacity.toString() !== slide.current.style.opacity)
        slide.current.style.opacity = opacity.toString();
      if (opacity >= 1) slide.current.style.opacity = '1';

      if (
        left.current < slide.current.offsetWidth * threshold * -1 ||
        left.current > slide.current.offsetWidth * threshold
      ) {
        onDragEnd();
        return;
      }

      startTime.current = Date.now();
    }
  };
  const onSwiped = (callback) => {
    callback();
  };

  useEffect(() => {
    slide.current.addEventListener('mouseup', onDragEndMouse);
    slide.current.addEventListener('touchend', onDragEndTouch);
    slide.current.addEventListener('mouseleave', onDragEndMouse);
    slideDefaultPosition.current = slide.current.getBoundingClientRect();

    return () => {
      slide.current.removeEventListener('mouseup', onDragEndMouse);
      slide.current.removeEventListener('touchend', onDragEndTouch);
      slide.current.removeEventListener('mouseleave', onDragEndMouse);
    };
  }, []);

  return (
    <div className='carousel-container'>
      <div className='carousel-content'>
        {leftButtonComponent ? (
          <LeftButton onClick={leftClickHandler} {...leftButtonProps} />
        ) : (
          <LeftButton isLeft onClick={leftClickHandler} {...leftButtonProps} />
        )}
        <div
          ref={slide}
          className='slide-wrapper'
          onMouseDown={onDragStartMouse}
          onTouchStart={onDragStartTouch}
        >
          {children.filter((node) => Number(node.key) === currentSlide)}
        </div>
        {rightButtonComponent ? (
          <RightButton onClick={rightClickHandler} {...rightButtonProps} />
        ) : (
          <RightButton
            isRight
            onClick={rightClickHandler}
            {...rightButtonProps}
          />
        )}
      </div>
      <div className='indicator-container'>{indicators}</div>
    </div>
  );
};

export default Carousel;
