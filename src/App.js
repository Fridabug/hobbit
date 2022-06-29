import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/main/chat/Dashboard';
import Profile from './components/main/profile/Profile';
import ToogleView from './components/toogleView/ToogleView';
import Authentication from './components/authentication/authentication';


function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <ToogleView/>
    </div>
  );
}

export default App;
