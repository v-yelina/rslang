import React, { FC, useEffect } from 'react';
import {
  Tabs,
} from 'antd';
import OneDayStat from './oneDayStat';
import AllTimeStat from './allTimeStat';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserSettings, fetchUserStatistic } from '../../store/thunks';
import { selectUser } from '../../store/slices/auth';

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { TabPane } = Tabs;
  useEffect(() => {
    dispatch(fetchUserSettings(user));
    dispatch(fetchUserStatistic(user));
  }, []);

  return (
    <>
      <h2>Statistics</h2>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Today" key="1">
          <OneDayStat />
        </TabPane>
        <TabPane tab="All time" key="2">
          <AllTimeStat />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Statistics;
