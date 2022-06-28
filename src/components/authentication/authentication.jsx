import {useContext} from 'react'
import { SignUpForm } from './sign-up/sign-up-form';
import { SignInForm } from './sign-in/sign-in-form';
import {UserContext} from '../../context/user.context'

import './authentication.styles.scss'

const Authentication = () => {

    const {currentUser} = useContext(UserContext)
    return (
        <>
        {!currentUser && <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
    </div>}
        </>
    )
}

export default Authentication