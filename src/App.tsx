import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/shared/header';
import Audiochallenge from './pages/audiochallenge';
import Home from './pages/home';
import Sprint from './pages/sprint';
import Statistics from './pages/statistics';
import Textbook from './pages/textbook';

import './App.css';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="textbook" element={<Textbook />} />
      <Route path="sprint" element={<Sprint />} />
      <Route path="audiochallenge" element={<Audiochallenge />} />
      <Route path="statistics" element={<Statistics />} />
    </Route>
  </Routes>
);

export default App;
