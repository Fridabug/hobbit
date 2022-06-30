import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from "../../../context/user.context";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../utils/firebase/firebase.utils';

function SearchBar() {
  const {currentUser, setHobbies, hobbies, query, setQuery} = useContext(UserContext);
 
  
  //get hobbies of current user
  useEffect(() => {
    if(currentUser){
      console.log(currentUser)
      const docRef = doc(db, "users", currentUser.uid)
      const getUser = async () => {
        const currentUserData = await getDoc(docRef)
        const currentHobbies = currentUserData.data().hobbies
        setHobbies(currentHobbies)
      }

      getUser()
    }
  }, [currentUser])

 
  //handle change in the form
  const handleHobbyChange = (e) => {
      const { value, checked} = e.target;
      let updatedArr = query;
      !checked ? updatedArr = query.filter(hobby => hobby !== value) : updatedArr.push(value);
      setQuery(updatedArr)
      // console.log(updatedArr)
  }


  return (
    <div>
      <form>
        {hobbies.map((hobby, i) => {
        return(
          <div>
            <input type="checkbox" key={i} id={hobby} name="hobby" value={hobby} onClick={handleHobbyChange} defaultChecked={true}/>
            <label for={hobby}>{hobby}</label>
          </div>
          )
        })}
      </form>
    </div>
  )
}

export default SearchBar