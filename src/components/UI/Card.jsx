import React, { useContext } from 'react';
import Button from './Button';
import './card.scss';
import { UserContext } from '../../context/user.context';

function Card({ imgUrl, name, text, hobbies, user }) {
  const { setContacts, contacts } = useContext(UserContext);

  const addContactHandler = (e) => {
    const contactsId = contacts.map((item) => item.id);
    if (contactsId.includes(user.id) === false) {
      setContacts((prev) => [...prev, user]);
      console.log('works ', user);
    }
  };
  return (
    <div className='card'>
      <div className='card-img-cont'>
        {imgUrl ? (
          <img className='card-img' src={imgUrl} alt='profile'></img>
        ) : (
          <img
            className='card-img'
            src='/img/no_picture.png'
            alt='profile'
          ></img>
        )}
      </div>
      <div className='card-body'>
        <div className='card-title'>{name}</div>
        <div className='card-text'>{text}</div>
        <div className='tags'>
          {hobbies
            ? hobbies.map((hobby) => <span className='tag'>{hobby}</span>)
            : null}
        </div>
      </div>
      <Button name='show profile' className='card-btn' />
      <Button name='Add to chat' className='card-btn' onClick={addContactHandler}>
      </Button>
    </div>
  );
}

export default Card;
