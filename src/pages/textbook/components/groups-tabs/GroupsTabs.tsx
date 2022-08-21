import React, { FC } from 'react';
import { Tabs } from 'antd';

import { wordsGroups } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import './groups-tabs.scss';
import { setCurrentGroup } from '../../../../store/slices/textbook';

const { TabPane } = Tabs;

const GroupsTabs: FC = () => {
  const dispatch = useAppDispatch();
  const { currentGroup } = useAppSelector((state) => state.textbook);
  const onGroupChange = (groupKey: string) => {
    dispatch(setCurrentGroup(Number(groupKey)));
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
