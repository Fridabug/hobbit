import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/main/home/Home';
import Chat from './components/main/chat/Chat';
import Profile from './components/main/profile/Profile';
import Authentication from './components/authentication/authentication';
import Context from './context/contextProvider';
import EditProfile from './components/main/profile/EditProfile';
function App() {
  const { profileSwitch } = useContext(Context);
  return (
    <div className='App'>
      <Sidebar />
      <Routes>
      <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Authentication />} />
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
