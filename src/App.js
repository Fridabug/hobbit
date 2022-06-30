import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/sidebar/sidebar';
import Home from './components/main/home/Home';
import Chat from './components/main/chat/Chat';
import Profile from './components/main/profile/Profile';
import Authentication from './components/authentication/authentication';
import EditProfile from './components/main/profile/EditProfile';

import Context from './context/contextProvider';
import { UserContext } from './context/user.context'

function App() {
  const { profileSwitch } = useContext(Context);
  const { currentUser } = useContext(UserContext);


  return (
    <div className='App'>
      <Routes>
      { currentUser ? 
        <Route path='/' element={<Home/>}/> :
        <Route path='/' element={<Authentication />} />
      }
      <Route path='/chat/:id' element={<Chat />} />
      <Route
        path='/profile'
        element={profileSwitch ? <Profile /> : <EditProfile />}
      />
      </Routes>
    </div>
  );
}

export default App;
