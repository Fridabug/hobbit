import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/main/home/Home';
import Chat from './components/main/chat/Chat';
import Profile from './components/main/profile/Profile';
import ToggleView from './components/toggle-view/toggleView';
import Authentication from './components/authentication/authentication';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/auth' element={<Authentication/>}/>
        <Route/>
      </Routes>
      <ToggleView/>
    </div>
  );
}

export default App;
