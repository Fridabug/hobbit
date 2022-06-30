import React from 'react';
import "./button.scss";

function Button({name, onClick}) {
  return (
    <button onClick={onClick} className='btn'>{name}</button>
  )
}

export default Button