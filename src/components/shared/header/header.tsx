import React, { FC } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearAuth } from '../../../store/slices/auth';
import { GameType, WordsSourceType } from '../../../store/types';
import { clearCurrentGame, setGameType, setWordsSource } from '../../../store/slices/currentGame';
import { clearSprintState } from '../../../store/slices/sprintGame';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(clearAuth());
    navigate('/');
  };

  const setSourceAndTypeGame = (source: WordsSourceType, type: GameType): void => {
    dispatch(clearCurrentGame());
    dispatch(clearSprintState());
    dispatch(setWordsSource(source));
    dispatch(setGameType(type));
  };

  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/textbook">Textbook</Link>
        <Link
          to="/games"
          onClick={() => setSourceAndTypeGame('group', 'sprint')}
        >
          Sprint
        </Link>
        <Link
          to="/games"
          onClick={() => setSourceAndTypeGame('group', 'audiochallenge')}
        >
          Audiochallenge
        </Link>
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
