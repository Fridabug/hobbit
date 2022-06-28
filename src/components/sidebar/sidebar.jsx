import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { SidebarContext } from '../../context/sidebar.context';

import Messages from './messages/messages';
import Contacts from './contacts/contacts';

function Sidebar() {
  const { isContactsOpen, setIsContactsOpen } = useContext(SidebarContext);
  const { setIsMessagesOpen } = useContext(SidebarContext);

  const toggleIsContactsOpen = () => { setIsContactsOpen(true); setIsMessagesOpen(false) };

  const toggleIsMessagesOpen = () => { setIsMessagesOpen(true); setIsContactsOpen(false) };

  return (
    <div>
      <div className='profile'></div>
      <div className='exit-button'></div>
      <div className='toggle-container'>
        <div onClick={toggleIsContactsOpen}>Contacts</div>
        <div onClick={toggleIsMessagesOpen}>Messages</div>
      </div>
      <div className='sidebar-content-container'>
      {isContactsOpen ? <Contacts /> : <Messages />}
      </div>
    <Outlet />
    </div>
  )
}

export default Sidebar