import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../../context/user.context';
import { db } from '../../../utils/firebase/firebase.utils';
import { doc, updateDoc, getDoc, collection } from 'firebase/firestore';
const EditProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({ userData });
  const [inputValue, setInputValue] = useState({});
  const [showAge, setShowAge] = useState(false);
  const hobby1 = useRef();
  const hobby2 = useRef();
  const hobby3 = useRef();
  const hobby4 = useRef();
  const hobby5 = useRef();
  const location = useRef();
  const message = useRef();
  const age = useRef();
  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, 'users', currentUser.uid);
      const gettingUser = async () => {
        const data = await getDoc(docRef);
        setUserData(data.data());
      };
      gettingUser();
    }
  }, [currentUser, showAge]);

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
    setShowAge(true);
    let userAge = 0;
    if (userData.userData?.age) {
      userAge = userData.userData.age;
    } else {
      const today = new Date();
      const userBirthDate = new Date(age.current.value);
      userAge = userData.userData?.age
        ? userData.userData?.age
        : +today.getFullYear() - +userBirthDate.getFullYear();
      const m = today.getMonth() - userBirthDate.getMonth();

      // eslint-disable-next-line no-unused-expressions
      m < 0 || (m === 0 && today.getDate() < userBirthDate.getDate())
        ? userAge--
        : userAge;
    }
    const newArr = [
      hobby1.current.value,
      hobby2.current.value,
      hobby3.current.value,
      hobby4.current.value,
      hobby5.current.value,
    ];
    const hobbyArray = newArr.filter((item) => item.trim().length > 0);
    const updatedUser = userInfo;
    updatedUser.userData = {
      age: userAge,
      message:
        message.current.value.split(' ').join('').length > 30
          ? message.current.value
          : "User doesn't have bio",
      location: location.current.value,
      hobbies: [...hobbyArray],
    };
    const updateUser = async () => {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, updatedUser);
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
              <h3>
                {userData.displayName ? userData.displayName : 'Franko'},
                {userData.userData?.age ? (
                  userData.userData?.age
                ) : (
                  <input
                    type='date'
                    name='date'
                    id='date'
                    ref={age}
                    max='2000-12-13'
                  />
                )}
              </h3>
              <input
                type='text'
                name='location'
                id='location'
                defaultValue={
                  userData.userData ? userData.userData.location : ''
                }
                placeholder='Enter your location'
                onChange={onChangeEditHandler}
                ref={location && location}
                required
              />
            </div>
          </div>
          <div className='profile__hobbies'>
            <ul>
              <li>
                <span>hobby1</span>
                <input
                  ref={hobby1}
                  type='text'
                  id='hobby1'
                  onChange={onChangeEditHandler}
                  placeholder='First hobby is required'
                  defaultValue={
                    userData.userData ? userData.userData.hobbies[0] : ''
                  }
                  name='hobby1'
                  required
                />
              </li>

              <li>
                <span>hobby2</span>
                <input
                  type='text'
                  id='hobby2'
                  name='hobby2'
                  onChange={onChangeEditHandler}
                  placeholder='Optional'
                  defaultValue={
                    userData.userData ? userData.userData.hobbies[1] : ''
                  }
                  ref={hobby2}
                />
              </li>
              <li>
                <span>hobby3</span>
                <input
                  type='text'
                  id='hobby3'
                  name='hobby3'
                  onChange={onChangeEditHandler}
                  placeholder='Optional'
                  defaultValue={
                    userData.userData ? userData.userData.hobbies[2] : ''
                  }
                  ref={hobby3}
                />
              </li>
              <li>
                <span>hobby4</span>
                <input
                  type='text'
                  id='hobby4'
                  name='hobby4'
                  onChange={onChangeEditHandler}
                  placeholder='Optional'
                  defaultValue={
                    userData.userData ? userData.userData.hobbies[3] : ''
                  }
                  ref={hobby4}
                />
              </li>
              <li>
                <span>hobby5</span>
                <input
                  type='text'
                  id='hobby5'
                  name='hobby5'
                  onChange={onChangeEditHandler}
                  placeholder='Optional'
                  defaultValue={
                    userData.userData ? userData.userData.hobbies[4] : ''
                  }
                  ref={hobby5}
                />
              </li>
            </ul>
          </div>
          <div className='profile__about'>
            <div className='profile__about-text'>
              <h3>About Me:</h3>
              <textarea
                onChange={onChangeEditHandler}
                name='message'
                ref={message}
                placeholder='You get more chance finding hobby partner if you have some bio (optional)'
              >
                {userData.message ? userData.message : ''}
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
