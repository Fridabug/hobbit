import React, {useState} from 'react'
import {auth, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/FormInput'
import './sign-up-form.styles.scss'
import Button from '../button/Button'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = defaultFormFields;

   const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formFields.password !== formFields.confirmPassword) {
           alert('Your password does not match');
           return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
            console.log(user)

            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        }
     
        catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use');
            }
            else {
                console.log('user creation encountered an error', error);
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
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
           
            <FormInput
                label='Display Name' 
                type="text" 
                name='displayName' 
                required 
                defaultValue={email}
                onChange={handleChange}
            />

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

            <FormInput 
                label='Confirm Password'
                type="password" 
                name='confirmPassword' 
                required 
                defaultValue={confirmPassword}
                onChange={handleChange}
            />
            <Button type="submit">Sign up</Button>
        </form>
    </div>
  )
}

export default SignUpForm