import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import logo from "../logo/Spotify_Logo_Black.png";
import fb from "../logo/fb.png";
import "bootstrap/dist/css/bootstrap.min.css";


import useForm from "./UseForm"; // IMPORTING THE COMPONENT WITH HOOKS

const SignUp = () => {
  // const { handleChange, values, handleSubmit } = useForm(); // DESTRUCTURING HOOKS TO BE ABLE TO USE THEM IN THIS COMPONENT

  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("test12345")
  const history = useHistory()

  const login = async ()=> {
    const url=process.env.REACT_APP_URL
    const res = await axios(`${url}users/login}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email, password
      }, withCredentials: true // use cookies
    })
    
    localStorage.setItem("accessToken", res.data)
  //  props.history.push("/")
  }
  return (
    <Container fluid id="signup-page-wrapper">
      <div className="sign-logo-wrapper">
        <Image src={logo} id="signup-page-logo" />
      </div>
      <div className="signup-items">
        <Button className="signup-btn fb my-2">
          <Image src={fb} id="fb" />
          CONTINUE WITH FACEBOOK
        </Button>
        <a href="http://localhost:3005/users/spotifyLoginLogin">  <Button className="signup-btn apple my-2">CONTINUE WITH SPOTIFY</Button></a>
        <a href="http://localhost:3005/users/googleLogin"> <Button className="signup-btn google my-2">CONTINUE WITH GOOGLE</Button></a>
      </div>
      <h6>OR</h6>
      <div className="form-inputs">
        <form className="form" onSubmit={login}>
          <label>Email address or username</label>
          <input
            className="form-input"
            id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
            name="email"
            type="email"
            placeholder="Email adress or username"
            value={email} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={e => setEmail(e.target.value)} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE


          />
          <br />
          <label>Password</label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <a href="#"> Forgot your password? </a>
          <div className="submit-btn">
            <input type="checkbox" id="checkbox" className="my-auto" />
            <p className="ml-n5 my-auto">Remember me</p>
            <input className="form-input-submit" type="submit" value="LOG IN" />
          </div>
        </form>
        <hr />
        <h4 className="text-center mb-3">Don't have an account?</h4>
        <button id="bottom-btn">SIGN UP FOR SPOTIFY</button>
      </div>
    </Container>
  );
};

export default SignUp;
