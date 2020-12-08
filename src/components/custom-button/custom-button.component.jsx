import React from 'react';

import LeftArrow from '../../../public/left-arrow.png';
import RightArrow from '../../../public/right-arrow.png';

import './custom-button.style.scss';

const CustomButton = (props) => {
  const { isLeft, isRight, onClick } = props;

  let Image = null;
  if (isLeft) Image = LeftArrow;
  else if (isRight) Image = RightArrow;

  return (
    <div className='arrow-button' onClick={onClick}>
      <img className='arrow-button-image' src={Image} />
    </div>
  );
};

export default CustomButton;
