import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../../context/user.context'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';



function Contacts() {

    const {currentUser} = useContext(UserContext);

// const [currentUser, setCurrentUser] = useState(null);



    const [users, setUsers] = useState([]);
    const value = { users };
    const userCollection = collection(db, 'users');

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollection);
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
  
        getUsers()
    }, [])

    console.log(users, 'users')
  return (
    <div>{users.map((user, index) => <ul key={index}>
      <li>{user.displayName ? user.displayName : user.email}</li>
    </ul>)}</div>
  )
}

export default Contacts