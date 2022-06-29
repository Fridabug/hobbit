import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../../context/user.context";



function UserCards() {
  const {currentUser, users} = useContext(UserContext);

  return (
    <div>
      User List

        {
          users.map((user, key) => {
            return <div key={key}>{user.displayName}</div>
          })
        }
    </div>
  )
}

export default UserCards