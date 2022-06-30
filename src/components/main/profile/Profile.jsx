import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import Context from '../../../context/contextProvider';
import { db } from '../../../utils/firebase/firebase.utils';
import { doc, getDoc } from 'firebase/firestore';
const Profile = ({ id }) => {
  const { currentUser } = useContext(UserContext);
  const { onEditHandler } = useContext(Context);
  const [userData, setUserData] = useState(null);
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

  return (
    userData && (
      <div className='profile'>
        <div className='profile'>
          <div className='profile-top'>
            <div className='profile-top__image'>
              <img
                src={userData?.userData?.image ? userData?.userData?.image : ''}
                alt=''
              />
            </div>
            <div className='profile-top__infos'>
              <h3>
                {
                  userData?.displayName}
                , {userData?.userData?.age}
              </h3>
              {userData?.userData?.location}
            </div>
          </div>
          <div className='profile__hobbies'>
            <ul>
              <li>{userData?.userData?.hobbies[0]}</li>

              <li>{userData?.userData?.hobbies[1]}</li>
              <li>{userData?.userData?.hobbies[2]}</li>
              <li>{userData?.userData?.hobbies[3]}</li>
              <li>{userData?.userData?.hobbies[4]}</li>
            </ul>
          </div>
          <div className='profile__about'>
            <div className='profile__about-text'>
              <h3>About Me:</h3>
              {userData?.userData?.message}
            </div>
          </div>
        </div>
        <button onClick={onEditHandler}>Edit Profile</button>
      </div>
    )
  );
};

export default Profile;