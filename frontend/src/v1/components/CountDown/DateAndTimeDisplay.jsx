import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger timeCoutDOwn' : 'countdown timeCoutDOwn'}>
      <div>{value}</div>
    </div>
  );
};

export default DateTimeDisplay;