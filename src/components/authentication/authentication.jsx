import { SignUpForm } from './sign-up/sign-up-form';
import { SignInForm } from './sign-in/sign-in-form';
import Intro from './intro'

import './authentication.styles.scss'

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <Intro />
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication