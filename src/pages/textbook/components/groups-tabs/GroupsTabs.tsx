import React, { FC } from 'react';
import { Tabs } from 'antd';

import { wordsGroups } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchWordsByGroupAndPage } from '../../../../store/thunks';

import './groups-tabs.scss';

const { TabPane } = Tabs;

const GroupsTabs: FC = () => {
  const dispatch = useAppDispatch();
  const { currentGroup, currentPage } = useAppSelector((state) => state.textbook);
  const onGroupChange = (groupKey: string) => {
    dispatch(
      fetchWordsByGroupAndPage({ group: groupKey.toString(), page: currentPage.toString() }),
    );
  };

  return (
    <Tabs defaultActiveKey={currentGroup.toString()} onChange={onGroupChange}>
      {[...wordsGroups].map((groupIndex) => (
        <TabPane key={groupIndex} tab={`Group ${groupIndex + 1}`} />
      ))}
    </Tabs>
  );
};

export default GroupsTabs;
