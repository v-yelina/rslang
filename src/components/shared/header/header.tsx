import React, { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearAuth } from '../../../store/slices/auth';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(clearAuth());
    navigate('/');
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/textbook">Textbook</Link>
        <Link to="/sprint">Sprint</Link>
        <Link to="/audiochallenge">Audiochallenge</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/demo">Demo</Link>
        <Link to="/login">Login</Link>
        {isLogged && <Button type="primary" onClick={logout}>Log out</Button>}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
