import React, {useContext, useState, useEffect} from 'react';
import { HobbyContext } from '../../../context/hobby.context';
import { UserContext } from "../../../context/user.context";




function UserCards() {
  const {currentUser, users} = useContext(UserContext);
  const [sortedUsers, setSortedUsers] = useState([]);
  const {hobbies} = useContext(HobbyContext);

  useEffect(() => {

    if(currentUser){
      

    }
  }, [])

  

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