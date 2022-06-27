import React from 'react';
import UserCards from './UserCards';
import SearchBar from './SearchBar';

function Home() {
  return (
    <div>
        <SearchBar/>
        <UserCards/>
    </div>
  )
}

export default Home