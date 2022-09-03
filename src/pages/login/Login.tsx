import React, {
  FC, useEffect, useState,
} from 'react';
import { Alert, Button, Layout } from 'antd';
import LoginForm from './loginForm';
import RegistrationForm from './registrationForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, clearIsRegistred } from '../../store/slices/auth';
import './login.scss';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.auth);
  const [loginTab, setLoginTab] = useState(true);
  const { Content } = Layout;
  const imageUrl = 'https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?w=740&t=st=1662210542~exp=1662211142~hmac=0c68c8bf45dacdb24c989bb46e5d492a82517c8dd0a317d69bca8799d59e6c41';

  useEffect(() => {
    dispatch(clearIsRegistred());
    dispatch(clearError());
  }, [loginTab]);

  const toggleActive = () => {
    const buttons = document.querySelectorAll('.login-tab-btn');
    buttons.forEach((button) => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      } else {
        button.classList.add('active');
      }
    });
  };

  return (
    <Content id="login-page">
      {isLogged ? <Alert message="You are successfully logged in" type="success" /> : (
        <div className="login-forms__container" style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className="login-forms">
            <div className="login-signin-buttons">
              <Button type="dashed" onClick={() => { setLoginTab(true); toggleActive(); }} style={{ height: 'max-content' }} className="active login-tab-btn">Login</Button>
              <Button type="dashed" onClick={() => { setLoginTab(false); toggleActive(); }} style={{ height: 'max-content' }} className="login-tab-btn">Registration</Button>
            </div>
            {loginTab ? <LoginForm /> : <RegistrationForm />}
          </div>
        </div>
      )}
    </Content>
  );
};

export default Login;
