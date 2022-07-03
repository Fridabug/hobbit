import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import UserCards from './UserCards';
import SearchBar from './SearchBar';
import NoHobbisYet from './NoHobbisYet';
import './home.scss';
import {BsHeart} from'react-icons/bs';

function Home() {
  const { currentUser, hobbies } = useContext(UserContext);
  
  
  return (
    <div className='home'>
      <div className='home-header'>
        <div className='logo'>
          <h1 id='logo'>Hobbyt</h1>
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
