import React, { FC, useState } from 'react';
import { Button } from 'antd';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';
import './login.scss';

const Login: FC = () => {
  const [isRegistred, setIsRegistred] = useState(true);

  return (
    <>
      <h2>Login Page</h2>
      <div className="login-forms">
        <div className="login-signin-buttons">
          <Button type="dashed" onClick={() => { setIsRegistred(true); }}>Login</Button>
          <Button type="dashed" onClick={() => { setIsRegistred(false); }}>Registration</Button>
        </div>
        {isRegistred ? <LoginForm /> : <RegistrationForm />}
      </div>
    </>
  );
};

export default Login;
