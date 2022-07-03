import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import UserCards from './UserCards';
import SearchBar from './SearchBar';
import NoHobbisYet from './NoHobbisYet';
import './style/home.scss';
import {GiOppositeHearts} from'react-icons/gi';
import {FaUserFriends} from 'react-icons/fa';

function Home() {
  const { currentUser, hobbies } = useContext(UserContext);
  
  
  return (
    <div className='home'>
      <div className='home-header'>
        <div className='logo'>
           <GiOppositeHearts/>
          <h1 id='logo'>Hobbyt</h1>
          <FaUserFriends/>
        </div>
      </div>
      {hobbies ? (
        <>
          <SearchBar />
          <UserCards />
        </>
      ) : <NoHobbisYet/>}
    </div>
  );
}

export default Home;
