import React from 'react';
import "./button.scss";

function Button({name}) {
  return (
    <button className='btn'>{name}</button>
  )
}

export default Button