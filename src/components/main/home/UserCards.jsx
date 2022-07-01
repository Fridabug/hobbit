import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../../context/user.context";
import Card from '../../UI/Card';



function UserCards() {
  const {currentUser, sortedUsers, contacts, setContacts} = useContext(UserContext);

  
  return (
    <div className='card-container'>
      {
        sortedUsers?.filter((i) => i.email !== currentUser.email).map((user, key) => {
          // console.log(user.id)
          return <Card key={key} name={user.displayName} imgUrl={user.userData.image} hobbies={user.userData.hobbies} contactId={user.id}>{user.displayName}</Card>
    
        })
      }
    </div>
  )
}

export default UserCards