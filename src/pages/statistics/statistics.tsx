import React, { FC, useEffect } from 'react';
import {
  Alert,
  Tabs, Layout,
} from 'antd';
import OneDayStat from './oneDayStat';
import AllTimeStat from './allTimeStat';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserSettings, fetchUserStatistic } from '../../store/thunks';
import { selectIsLogged, selectUser } from '../../store/slices/auth';
import './statistics.scss';

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogged);
  const user = useAppSelector(selectUser);
  const { TabPane } = Tabs;
  const { Content } = Layout;

  useEffect(() => {
    dispatch(fetchUserSettings(user));
    dispatch(fetchUserStatistic(user));
  }, []);

  return (
    <Content id='statistics-page'>
      {isLogged
        ? (
          <Tabs defaultActiveKey="1" centered size='large' >
            <TabPane tab="Today" key="1" >
              <OneDayStat />
            </TabPane>
            <TabPane tab="All time" key="2" >
              <AllTimeStat />
            </TabPane>
          </Tabs>
        )
        : <Alert message="Please, sign up or log in to see this page" type="error" />}
    </Content>
  );
};

export default Statistics;
