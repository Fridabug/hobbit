import { useState, useContext } from 'react';

import { SignUpForm } from './sign-up/sign-up-form';
import { SignInForm } from './sign-in/sign-in-form';
import Intro from './intro'
import { UserContext } from '../../context/user.context';

import Button from '../button/button';
import PopUp from '../pop-up/pop-up';

import './authentication.styles.scss'

const Authentication = () => {
    const { currentUser } = useContext(UserContext);
    const [toggle, setToggle] = useState(false);

    const togglePopUp = () => {
        setToggle(!toggle)
    }

    if(currentUser) {
        window.location.replace('/home')
      }

    console.log(toggle);

    return (
        <div className='authentication-container'>
            <Intro />
            <div className='form-container'>
                <SignInForm />
                <Button onClick={togglePopUp}>
                    Register
                </Button>
                
            </div>
            { toggle ? <PopUp toggle={togglePopUp} content={<SignUpForm />}/> : null }
        </div>
    )
}

export default Authentication;
