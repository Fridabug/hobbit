import { getDocs, collection } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';
import { createContext, useEffect, useState } from 'react';

export const HobbyContext = createContext()

const userCollection = collection(db, 'users');

const SortUsers = ({children}) => {
    const [sortedUsers, setSortedUsers] = useState([]);
    
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollection)
            setSortedUsers()
        }
        getUsers()
    }, [])

}