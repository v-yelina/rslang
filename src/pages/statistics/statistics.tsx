import React, { FC, useEffect } from 'react';
import {
  Tabs, Layout,
} from 'antd';
import OneDayStat from './oneDayStat';
import AllTimeStat from './allTimeStat';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserSettings, fetchUserStatistic } from '../../store/thunks';
import { selectUser } from '../../store/slices/auth';
import './statistics.scss';

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { TabPane } = Tabs;
  const { Content } = Layout;

  useEffect(() => {
    dispatch(fetchUserSettings(user));
    dispatch(fetchUserStatistic(user));
  }, []);

  return (
    <Content id='statistics-page'>
      <h2>Statistics</h2>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Today" key="1">
          <OneDayStat />
        </TabPane>
        <TabPane tab="All time" key="2">
          <AllTimeStat />
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default Statistics;
