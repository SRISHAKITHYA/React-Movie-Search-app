import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeComponent from "./HomeComponent";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
  background: rgb(0, 0, 0, 0.5);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.01) 0%,
    rgba(16, 107, 231, 0.6) 35%,
    rgba(133, 180, 190, 0.6) 55%
  );
`;
const Snackbar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: visibility 0.1s ease-in-out;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: darkgray;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  margin-right: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const AppName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 600;
  font-style: bold;
`;

const MovieImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const CreateAccountContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const CreateAccountText = styled.span`
  color: darkgray;
  margin-left: 0;
`;

const CreateAccountButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;
`;

const LoginComponent = () => {
  const [signUp, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/api/login", {
        username,
        password,
      });
      console.log(response.data);
      setIsLoggedIn(true);
      setShowSnackbar(true);
    } catch (error) {
      console.error("error while logging in", error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/api/signup", {
        username,
        password,
      });
      console.log(response.data);
      setShowSnackbar(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("error while signing up:", error);
    }
  };

  const toggleSignUp = (event) => {
    event.preventDefault();
    setSignUp(!signUp);
  };
  return isLoggedIn ? (
    <HomeComponent />
  ) : (
    <LoginContainer>
      <Snackbar show={showSnackbar} onClick={() => setShowSnackbar(false)}>
        Account created successfully!
      </Snackbar>
      <AppName>
        <MovieImage src="/movie.png" alt="Movie" />
        FilmFiesta
      </AppName>
      <LoginForm onSubmit={signUp ? handleSignUp : handleLogin}>
        <LoginTitle>{signUp ? "Sign Up" : "LOGIN"}</LoginTitle>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">
          {signUp ? "Sign Up" : "Login"}
        </SubmitButton>
        <CreateAccountContainer>
          <CreateAccountText>
            {signUp ? "Go back to login" : "Don't have an account?"}
          </CreateAccountText>
          <CreateAccountButton onClick={toggleSignUp}>
            {signUp ? "Login" : "Create account"}
          </CreateAccountButton>
        </CreateAccountContainer>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginComponent;
