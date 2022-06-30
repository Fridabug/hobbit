import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../../context/user.context";



function UserCards() {
  const {currentUser, sortedUsers} = useContext(UserContext);
  
  return (
    <div>
      User List
        {
          sortedUsers.map((user, key) => {
            return <div key={key}>{user.displayName}</div>
          })
        }
    </div>
  )
}

export default UserCards