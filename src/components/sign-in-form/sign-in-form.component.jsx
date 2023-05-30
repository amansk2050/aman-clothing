import React from "react";
import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassowrd,
} from "../../utils/firebase/firebase.utils";
import FormImput from "../form-input/form-input.component";
import Buttons from "../button/button.component";
import "./sign-in-form.styles.scss";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    console.log("1");
    const response = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //code ..
      const response = await signInAuthUserWithEmailAndPassowrd(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/invalid-email":
          alert("Invalid email");
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormImput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormImput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Buttons type="submit">Sign In</Buttons>
          <Buttons type='button' buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Buttons>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
