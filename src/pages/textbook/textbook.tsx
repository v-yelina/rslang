import React, { FC } from 'react';
import GroupsTabs from './components/groups-tabs';
import WordsList from './components/words-list';

const Textbook: FC = () => (
  <>
    <h2>Textbook Page</h2>
    <GroupsTabs />
    <WordsList />
  </>
);

export default Textbook;
