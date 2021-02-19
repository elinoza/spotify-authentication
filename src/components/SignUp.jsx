import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import logo from "../logo/Spotify_Logo_Black.png";
import fb from "../logo/fb.png";
import "bootstrap/dist/css/bootstrap.min.css";
import useForm from "./UseForm"; // IMPORTING THE COMPONENT WITH HOOKS

const SignUp = () => {
  const { handleChange, values, handleSubmit } = useForm(); // DESTRUCTURING HOOKS TO BE ABLE TO USE THEM IN THIS COMPONENT
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
        <Button className="signup-btn apple my-2">CONTINUE WITH APPLE</Button>
        <Button className="signup-btn google my-2">CONTINUE WITH GOOGLE</Button>
      </div>
      <h6>OR</h6>
      <div className="form-inputs">
        <form className="form" onSubmit={handleSubmit}>
          <label>Email addess or username</label>
          <input
            className="form-input"
            id="email" // WITH THIS ID IT CHECKS IF IT'S A VALID EMAIL
            name="email"
            type="email"
            placeholder="Email adress or username"
            value={values.email} // TAKES THE VALUE FROM MY CUSTOM HOOKS IN USEFORM COMPONENT
            onChange={handleChange} // THE FUNCTION THAT LISTENS TO THE CHANGE OF THE VALUE
          />
          <br />
          <label>Password</label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
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
