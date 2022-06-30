import React, { useEffect, useContext } from 'react';
import { UserContext } from "../../../context/user.context";
import UserCards from './UserCards';
import SearchBar from './SearchBar';

function Home() {
  const {currentUser, hobbies} = useContext(UserContext);

  return (
    <div>
      {hobbies ? (
        <>
        <SearchBar/>
        <UserCards/>
        </>
      ) : null}
    </div>
  )
}

export default Home