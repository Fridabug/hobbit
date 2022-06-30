import { useState } from 'react';

import { SignUpForm } from './sign-up/sign-up-form';
import { SignInForm } from './sign-in/sign-in-form';
import Intro from './intro'

import Button from '../button/button';
import PopUp from '../pop-up/pop-up';

import './authentication.styles.scss'

const Authentication = () => {
    const [toggle, setToggle] = useState(false);

    const togglePopUp = () => {
        setToggle(!toggle)
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
