import React, { FC, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Button, Typography, Menu, Layout,
} from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import QueueAnim from 'rc-queue-anim';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearAuth } from '../../../store/slices/auth';
import { GameType, WordsSourceType } from '../../../store/types';
import { clearCurrentGame, setGameType, setWordsSource } from '../../../store/slices/currentGame';
import { clearSprintState } from '../../../store/slices/sprintGame';

import './header.scss';

const { Title } = Typography;

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogged } = useAppSelector((state) => state.auth);
  const [isShow, setIsShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [selected, setSelected] = useState(`${sessionStorage.getItem('link') || 'home'}`);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    if (windowWidth <= 768) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => (
    (windowWidth <= 768) ? setIsShow(false) : setIsShow(true)
  ), [windowWidth]);

  const toggleMenuItem = (url: string) => {
    if (windowWidth <= 768) {
      setIsShow(false);
    }
    setSelected(url);
    sessionStorage.setItem('link', url);
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(clearAuth());
    navigate('/');
    toggleMenuItem('home');
  };

  const setSourceAndTypeGame = (source: WordsSourceType, type: GameType): void => {
    dispatch(clearCurrentGame());
    dispatch(clearSprintState());
    dispatch(setWordsSource(source));
    dispatch(setGameType(type));
  };

  const menuItems: ItemType[] = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
      className: 'header__link',
      onClick: () => toggleMenuItem('home'),
    },
    {
      key: 'textbook',
      label: <Link to="/textbook">Textbook</Link>,
      className: 'header__link',
      onClick: () => toggleMenuItem('textbook'),
    },
    {
      key: 'sprint',
      label: (
        <Link
          to="/games"
          onClick={() => setSourceAndTypeGame('group', 'sprint')}
        >
          Sprint
        </Link>
      ),
      className: 'header__link',
      onClick: () => toggleMenuItem('sprint'),
    },
    {
      key: 'audiochallenge',
      label: (
        <Link
          to="/games"
          onClick={() => setSourceAndTypeGame('group', 'audiochallenge')}
        >
          Audiochallenge
        </Link>
      ),
      className: 'header__link',
      onClick: () => toggleMenuItem('audiochallenge'),
    },
    {
      key: 'statistics',
      label: <Link to="/statistics">Statistics</Link>,
      className: 'header__link',
      onClick: () => toggleMenuItem('statistics'),
    },
  ];

  return (
    <Layout.Header className="header" id="header">
      <div className="header__wrapper">
        <Title level={1}>RSLang</Title>
        {(windowWidth <= 768)
          && (
          <Button
            id="burger-menu"
            icon={isShow ? <CloseOutlined /> : <MenuOutlined />}
            type="link"
            onClick={() => setIsShow(!isShow)}
          />
          )}
        <QueueAnim className="header__animation">
          {
            isShow && (
              <div className={(windowWidth <= 768) ? 'header__menu header__menu--mobile' : 'header__menu'}>
                <Menu
                  mode={(windowWidth <= 768) ? 'vertical' : 'horizontal'}
                  id="header-menu"
                  defaultSelectedKeys={['home']}
                  selectedKeys={[selected]}
                  items={menuItems}
                />
                <div
                  className="header__authorization"
                >
                  {
                  isLogged
                    ? <Button type="primary" onClick={logout} className="btn btn--logout">Log out</Button>
                    : <Link to="/login" className="btn btn--login" onClick={() => toggleMenuItem('')}>Login</Link>
                }
                </div>
              </div>
            )
          }
        </QueueAnim>
        <Outlet />
      </div>
    </Layout.Header>
  );
};

export default Header;
