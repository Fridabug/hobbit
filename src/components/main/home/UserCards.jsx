import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../../context/user.context";
import Card from '../../UI/Card';



function UserCards() {
  const {currentUser, sortedUsers} = useContext(UserContext);
  
  return (
    <div>
      User List
        {
          sortedUsers.map((user, key) => {
            return <Card key={key}>{user.displayName}</Card>
          })
        }
    </div>
  )
}

export default UserCards