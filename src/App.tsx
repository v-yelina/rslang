import React, { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/shared/header';
import Audiochallenge from './pages/audiochallenge';
import Home from './pages/home';
import Sprint from './pages/sprint';
import Statistics from './pages/statistics';
import Textbook from './pages/textbook';
import Login from './pages/login';
import LevelSelect from './components/level-select';
import Footer from './components/shared/footer';

import './App.css';

const { Content } = Layout;

const App: FC = () => {
  const location = useLocation();
  const url = location.pathname.split('/');
  const currentUrl = url[url.length - 1];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Header />
      <Content>
        <Routes>
          <Route index element={<Home />} />
          <Route path="textbook" element={<Textbook />} />
          <Route path="games" element={<LevelSelect />} />
          <Route path="games/sprint" element={<Sprint />} />
          <Route path="games/audiochallenge" element={<Audiochallenge />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Content>
      {
        (currentUrl !== 'sprint')
        && (currentUrl !== 'audiochallenge')
        && <Footer />
      }
    </Layout>
  );
};

export default App;
