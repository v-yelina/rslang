import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Header: FC = () => (
  <>
    <div>
      <Link to="/">Home</Link>
      <Link to="/textbook">Textbook</Link>
      <Link to="/sprint">Sprint</Link>
      <Link to="/audiochallenge">Audiochallenge</Link>
      <Link to="/statistics">Statistics</Link>
      <Link to="/demo">Demo</Link>
    </div>
    <Outlet />
  </>
);

export default Header;
