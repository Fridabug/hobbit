import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarContext } from '../../../context/SidebarContext';
import Conversation from './Conversation';
import Contacts from './Contacts';
import { auth } from '../../../utils/firebase/firebase.utils'
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../../context/user.context'

function Sidebar() {
  const { isContactsOpen, setIsContactsOpen, setIsMessagesOpen } = useContext(SidebarContext);
  const toggleIsContactsOpen = () => { setIsContactsOpen(true); setIsMessagesOpen(false) };
  const toggleIsMessagesOpen = () => { setIsMessagesOpen(true); setIsContactsOpen(false) };

  const {currentUser} = useContext(UserContext);


  const navigate = useNavigate();

        const handleLogout = async () => {
        await auth.signOut();
        console.log(currentUser);
        navigate('/')
    }

  return (
    <div>
      <div className='profile'></div>
      <div className='exit-button'></div>
      <div className='toggle-container'>
        <div onClick={toggleIsContactsOpen}>Contacts</div>
        <div onClick={toggleIsMessagesOpen}>Messages</div>
      </div>
      <div className='sidebar-content-container'>
      {isContactsOpen ? <Contacts /> : <Conversation />}
      <button onClick={handleLogout}>Logout</button>
      </div>
    <Outlet />
    </div>
  )
}
export default Sidebar