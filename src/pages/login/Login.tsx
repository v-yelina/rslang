import React, { FC, useEffect, useState } from 'react';
import { Alert, Button } from 'antd';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';
import './login.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, clearIsRegistred } from '../../store/slices/auth';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.auth);
  const [loginTab, setLoginTab] = useState(true);

  useEffect(() => {
    dispatch(clearIsRegistred());
    dispatch(clearError());
  }, [loginTab]);

  return (
    <>
      <h2>Login Page</h2>
      {isLogged ? <Alert message="You are successfully logged in" type="success" /> : (
        <div className="login-forms">
          <div className="login-signin-buttons">
            <Button type="dashed" onClick={() => { setLoginTab(true); }}>Login</Button>
            <Button type="dashed" onClick={() => { setLoginTab(false); }}>Registration</Button>
          </div>
          {loginTab ? <LoginForm /> : <RegistrationForm />}
        </div>
      )}
    </>
  );
};

export default Login;
