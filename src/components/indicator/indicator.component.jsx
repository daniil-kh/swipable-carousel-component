import React from 'react';

import './indicator.style.scss';
import ActiveIcon from '../../../public/circle-active.webp';
import InactiveIcon from '../../../public/circle-inactive.png';

const DefaultIndicator = (props) => {
  const { onClick, isActive } = props;

  return (
    <div
      className={`indicator ${isActive ? 'indicator-active' : null}`}
      onClick={onClick}
    >
      <img
        className='indicator-image'
        src={isActive ? ActiveIcon : InactiveIcon}
      />
    </div>
  );
};

export default DefaultIndicator;
