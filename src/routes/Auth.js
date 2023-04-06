import React, { useState } from 'react'
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthForm from 'components/Authform';
import "styles/auth.scss"
import { authService } from 'fbase';


function Auth() {

  const onSocialClick = (e) => {
    console.log('e.target.name->', e.target.name);
    const {target:{name}} = e;
    let provider;
    if(name === "google"){
     provider = new GoogleAuthProvider();
    }else if(name === "github"){
     provider = new GithubAuthProvider();
    }
    signInWithPopup(authService, provider);
  }

  return (
    <div className='authContainer'>
       <FontAwesomeIcon icon="fa-brands fa-twitter" size='3x' color={"#04AAFF"}
       style={{marginBottom:30}}/>
       <AuthForm/>
      <div className='authBtns'>
        <button onClick={onSocialClick} name="google" className='authBtn'>
          Continue with Goole<FontAwesomeIcon icon="fa-brands fa-google" />
        </button>
        <button onClick={onSocialClick} name="github" className='authBtn'>
          Continue with Github<FontAwesomeIcon icon="fa-brands fa-github" />
        </button>
      </div>
    </div>
  )
}

export default Auth