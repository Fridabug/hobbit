<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react';
import Button from '../../UI/Button';
import './style/user-card.scss';
import { UserContext } from '../../../context/user.context';
import ShowProfile from './ShowProfile';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../../utils/firebase/firebase.utils';
function Card({
  imgUrl,
  name,
  text,
  hobbies,
  contactId,
  user,
  message,
  age,
  location,
}) {
  const { setContacts, contacts, currentUser } = useContext(UserContext);
  const [userData1, setUserData1] = useState(null);
  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      const gettingUser = async () => {
        const data = await getDoc(docRef);
        setUserData1(data.data());
      };
      gettingUser();
    }
  }, [currentUser]);
  console.log(userData1);
  const addContactHandler = (e) => {
    const contactsId = contacts.map((item) => item.id);

=======

import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/user.context';

import ShowProfile from './ShowProfile'
import Button from '../../UI/Button';

import './style/user-card.scss';

function Card({ imgUrl, name, text, hobbies, contactId, user, message, age, location }) {
  const { setContacts, contacts } = useContext(UserContext);
  const contactsId = contacts.map((item) => item.id);

  const addContactHandler = (e) => {
>>>>>>> 9e688b06ec8bc60d395fd1d47022f417cba1db2d
    if (contactsId.includes(user.id) === false) {
      setContacts((prev) => [...prev, user]);
      const updatedUser = userData1;
      updatedUser.contacts = [...contacts, user];
      const updateUser = async () => {
        const userDoc = doc(db, 'users', currentUser.uid);
        await updateDoc(userDoc, updatedUser);
      };
      updateUser();
    }
  };

  const [toggle, setToggle] = useState(false);

  const togglePopUp = () => {
    setToggle(!toggle);
  };
  return (
    <div className={`card ${contactId}`}>
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
            ? hobbies.map((hobby, id) => <span className='tag' key={id}>{hobby}</span>)
            : null}
        </div>
      </div>
<<<<<<< HEAD
      <Button
        name='show profile'
        className='card-btn secondary'
        onClick={togglePopUp}
      />
      <Button
        name='Add to chat'
        className='card-btn'
        onClick={addContactHandler}
      ></Button>
      {toggle ? (
        <ShowProfile
          toggle={togglePopUp}
          userName={name}
          message={message}
          user={user}
          hobbies={hobbies}
          imgUrl={imgUrl}
          age={age}
          location={location}
        />
      ) : null}
=======
      <Button name='show profile' className='card-btn' onClick={togglePopUp}/>
      <Button 
        name={contactsId.includes(user.id) ? 'Added' : 'Add to chat' } 
        className='card-btn' 
        onClick={addContactHandler}
      >
      </Button>
      {toggle ? <ShowProfile toggle={togglePopUp} userName={name} message={message} user={user} hobbies={hobbies} imgUrl={imgUrl} age={age} location={location}/> : null }
>>>>>>> 9e688b06ec8bc60d395fd1d47022f417cba1db2d
    </div>
  );
}

export default Card;
