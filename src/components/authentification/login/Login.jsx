import React, {useState} from 'react'
import {auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/FormInput'
import './sign-in-form.styles.scss'
import Button from '../button/Button'


const defaultFormFields = {
    email: '',
    password: '',
}
function SignInForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

   const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        // destructure the response that we get after successfully signing in, to get the user object
        const {user} = await signInWithGooglePopup();
        // create user
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }

     
        catch (error) {
        switch(error.code) {
            case 'auth/wrong-password':
            alert('incorrect password for email');
            break;

            case 'auth/user-not-found': 
            alert('no user associated with this email');
            break;

            default:
                console.log(error);
            }
          
        }
    }
        

        
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
        console.log(formFields)
    }

  return (
    <div className='sign-up-container'>
    <h2>I already have an account</h2>
    <span>Sign in with your email and password</span>
    <form onSubmit={handleSubmit}>
        <FormInput
            label='Email' 
            type="email" 
            name='email' 
            required 
            defaultValue={email}
            onChange={handleChange}
        />

        <FormInput
        label='Password' 
        type="password" 
        name='password' 
        required 
        defaultValue={password}
        onChange={handleChange}
        />

        <div className='buttons-container'>
            <Button type="submit">Sign in</Button>
            <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
        </div>
        
        </form>
    </div>
  )
}

export default SignInForm;