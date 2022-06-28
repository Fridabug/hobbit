import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from "../../../context/user.context";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../utils/firebase/firebase.utils';

function SearchBar() {
  const {currentUser} = useContext(UserContext);
  const [hobbies, setHobbies] = useState([])
  console.log(currentUser)


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

  console.log(hobbies)
  return (
    <div>
      <form>
        {hobbies.map((hobby) => {
        return(
          <div>
            <input type="checkbox" id={hobby} name={hobby}/>
            <label for={hobby}>{hobby}</label>
          </div>
          )
        })}
      </form>
    </div>
  )
}

export default SearchBar