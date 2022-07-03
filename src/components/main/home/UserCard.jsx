
import React, { useContext, useState } from 'react';
import Button from '../../UI/Button';
import './user-card.scss';
import { UserContext } from '../../../context/user.context';
import ShowProfile from './ShowProfile'

function Card({ imgUrl, name, text, hobbies, contactId, user, message, age, location }) {
  const { setContacts, contacts } = useContext(UserContext);

  const addContactHandler = (e) => {
    const contactsId = contacts.map((item) => item.id);
    if (contactsId.includes(user.id) === false) {
      setContacts((prev) => [...prev, user]);
      console.log('works ', user);
    }
  };

  const [toggle, setToggle] = useState(false);

  const togglePopUp = () => {
      setToggle(!toggle)
  }
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
      <Button name='show profile' className='card-btn secondary' onClick={togglePopUp}/>
      <Button name='Add to chat' className='card-btn' onClick={addContactHandler}>
      </Button>
      {toggle ? <ShowProfile toggle={togglePopUp} userName={name} message={message} user={user} hobbies={hobbies} imgUrl={imgUrl} age={age} location={location}/> : null }
    </div>
  );
}

export default Card;
