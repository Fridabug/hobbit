import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/main/home/Home';
import Chat from './components/main/chat/Chat';
import Profile from './components/main/profile/Profile';
import ToogleView from './components/toogleView/ToogleView';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route/>
      </Routes>
      <ToogleView/>
    </div>
  );
}

export default App;