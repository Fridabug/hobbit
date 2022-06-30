import React from 'react'
import Button from './Button'
import './card.scss';

function Card({imgUrl, name, text, hobbies}) {
  return (
    <div className='card'>
      {imgUrl ? <img className='card-img' src={imgUrl} alt="profile"></img> : <img className='card-img' src="/img/no_picture.png" alt="profile"></img>}
      <div className='card-body'>
        <div className='card-title'>{name}</div>
        <div className='card-text'>{text}</div>
        {hobbies ? hobbies.map((hobby) => <div className='tags'>{hobby}</div>
        ) : null}
        <Button name="show profile"/>
      </div>
    </div>
  )
}

export default Card