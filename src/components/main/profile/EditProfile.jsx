import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../../context/user.context';

import { db } from '../../../utils/firebase/firebase.utils';
import { doc, updateDoc, getDoc, collection } from 'firebase/firestore';

const EditProfile = () => {

  const { currentUser } = useContext(UserContext);
  
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({ userData });
  const [inputValue, setInputValue] = useState({
    hobbies: {},
    city: '',
    age: '',
    message: '',
  });

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      const gettingUser = async () => {
        const data = await getDoc(docRef);
        setUserData(data.data());
      };
      gettingUser();
    }
  }, [currentUser]);

  const onChangeEditHandler = (e) => {
    if (e.target.name.includes('hobby')) {
      setInputValue((pre) => ({
        ...pre,
        hobbies: { ...pre.hobbies, [e.target.name]: e.target.value },
      }));
    } else {
      setInputValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    }
  };
  const onEditSubmitHandler = (e) => {
    e.preventDefault();

    // setUserInfo((pre) => ({ ...pre, userData: inputValue }));
    const updatedUser = userInfo;
    updatedUser.userData = inputValue;
    const updateUser = async () => {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc({ ...userDoc, updatedUser });
    };
    updateUser();
  };

  return userData ? (
    <div className='profile'>
      <form onSubmit={onEditSubmitHandler}>
        <div className='profile'>
          <div className='profile-top'>
            <div className='profile-top__image'>
              {' '}
              <img
                src={
                  userData.image
                    ? userData.image
                    : 'http://jbusse.de/simple-site-map/Pictures/100000000000019D00000213BD56DAB0.png'
                }
                alt=''
              />
            </div>
            <div className='profile-top__infos'>
              <h3>{userData.displayName ? userData.displayName : 'Franko'},</h3>
              <input
                type='text'
                name='city'
                id='city'
                value={userData.age}
                onChange={onChangeEditHandler}
              />
            </div>
          </div>
          <div className='profile__hobbies'>
            <ul>
              <li>
                <span>hobby1</span>
                <input
                  type='text'
                  id='hobby1'
                  onChange={onChangeEditHandler}
                  name='hobby1'
                  value={userData.userData.hobbies.hobby1}
                />
              </li>

              <li>
                <span>hobby2</span>
                <input
                  type='text'
                  id='hobby2'
                  name='hobby2'
                  onChange={onChangeEditHandler}
                  value={userData.userData.hobbies.hobby2}
                />
              </li>
              <li>
                <span>hobby3</span>
                <input
                  type='text'
                  id='hobby3'
                  name='hobby3'
                  onChange={onChangeEditHandler}
                  value={userData.userData.hobbies.hobby3}
                />
              </li>
              <li>
                <span>hobby4</span>
                <input
                  type='text'
                  id='hobby4'
                  name='hobby4'
                  onChange={onChangeEditHandler}
                  value={userData.userData.hobbies.hobby4}
                />
              </li>
              <li>
                <span>hobby5</span>
                <input
                  type='text'
                  id='hobby5'
                  name='hobby5'
                  onChange={onChangeEditHandler}
                  value={userData.userData.hobbies.hobby5}
                />
              </li>
            </ul>
          </div>
          <div className='profile__about'>
            <div className='profile__about-text'>
              <h3>About Me:</h3>
              <textarea onChange={onChangeEditHandler} name='message'>
                {userData.aboutMe ? userData.aboutMe : ''}
              </textarea>
            </div>
          </div>
        </div>
        <button type='submit'>Submit Changes</button>
      </form>
    </div>
  ) : null;
};

export default EditProfile;