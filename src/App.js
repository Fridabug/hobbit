import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/main/chat/Dashboard';
import Home from './components/main/home/Home';
import Profile from './components/main/profile/Profile';
import Authentication from './components/authentication/authentication';
import EditProfile from './components/main/profile/EditProfile';
import Context from './context/contextProvider';

function App() {
  const { profileSwitch, loggedStatus } = useContext(Context);

  return (
    <div className='App'>
      {loggedStatus ? (
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Dashboard />} />
          <Route
            path='/profile'
            element={profileSwitch ? <Profile /> : <EditProfile />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Authentication />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
