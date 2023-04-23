import React, {useContext} from 'react';
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {AuthContext} from "../context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const login = e => {
    e.preventDefault()
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }
  return (
      <div>
        <h1>Login page</h1>
        <form onSubmit={login}>
          <Input type="text" placeholder='Login'/>
          <Input type="password" placeholder='Password'/>
          <Button>Login</Button>
        </form>
      </div>
  );
};

export default Login;