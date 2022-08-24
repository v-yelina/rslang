import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { useAppSelector } from '../../../store/hooks';

const Header: FC = () => {
  const { isLogged } = useAppSelector((state) => state.auth);

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
        {isLogged && <Button type="primary" onClick={() => { localStorage.removeItem('user'); }}>Log out</Button>}
      </div>
      <Outlet />
    </>
  );
};

export default Header;
