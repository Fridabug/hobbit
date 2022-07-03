import './style/sidebar.scss';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { SidebarContext } from '../../../context/SidebarContext';
import Conversation from './Conversation';
import Contacts from './Contacts';
import { auth } from '../../../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/user.context';
import Button from '../../UI/Button';

// for --> userDate --> here below
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';
import Context from '../../../context/contextProvider';
function Sidebar() {
  const { isContactsOpen } = useContext(SidebarContext);

  const { currentUser, sortedUsers, contacts } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const { setLoggedStatus } = useContext(Context);

  const navigate = useNavigate();
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
  const handleLogout = async () => {
    console.log('hmmm');
    await auth.signOut();
    navigate('/');
    setLoggedStatus(false);
  };
  // uri: get user data --> i wasn't sure if to put it in the context so i added it here to the file

  return (
    
    userData?.userData && (
      <div className='sidebar-wrapper'>
        <div className='profile'>
          <Link to='/profile'>
            <img src={userData.userData?.image} alt='profile' />
          </Link>
          <h3>{userData?.displayName} </h3>
        </div>
        <div className='exit-button'></div>
        {/* <div className="sidebar-content-container"> */}
        {isContactsOpen ? <Contacts /> : <Conversation />}
        <Button
          onClick={handleLogout}
          name='logout'
          className='sidebar-button'
        />
        <Outlet />
      </div>
    )
  );
}
export default Sidebar;
