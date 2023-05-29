import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const SignIn = () => {

  const logGoogleUser = async() =>{
    const response = await signInWithGooglePopup();
    const userDocRef= await createUserDocumentFromAuth(response.user);
  }
  return (
    <div>
      <h1>Sing in With google</h1>
      <button onClick={logGoogleUser}>sign in with popup</button>
    </div>
  )
}

export default SignIn