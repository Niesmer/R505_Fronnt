import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      {isLogin
        ? (
            <LoginForm handleSubmit={handleSubmit} />
          )
        : (
            <SignupForm handleSubmit={handleSubmit} />
          )}
      <p>Pas encore de compte ?</p>
      <Button onClick={toggleIsLogin}>Créer un compte</Button>
    </Container>
  );
};

export default Login;
