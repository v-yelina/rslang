import React, { FC, useEffect } from 'react';
import {
  Alert,
  Tabs, Layout,
} from 'antd';
import OneDayStat from './oneDayStat';
import AllTimeStat from './allTimeStat';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchUserSettings, fetchUserStatistic, updateSettings, updateStatistic,
} from '../../store/thunks';
import { selectIsLogged, selectUser } from '../../store/slices/auth';
import './statistics.scss';
import { IDayStat, ISettings } from '../../interfaces/ISettings';
import { checkDate, getNewDayStat, getToday } from './helpers';
import { initialState } from '../../store/slices/statistic';

const Statistics: FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogged);
  const user = useAppSelector(selectUser);
  const {
    statistic, settings,
  } = useAppSelector((state) => state.statistic);
  const { TabPane } = Tabs;
  const { Content } = Layout;

  const sendDayStatistic = (newDayStat: IDayStat) => {
    const newDate: string = statistic.optional.statisticDay;
    const newStat: IDayStat = {
      learnedWords: newDayStat.learnedWords,
      newWordsCount: newDayStat.newWordsCount,
      gamesCount: newDayStat.gamesCount,
    };
    const newOptional = {};
    Object.defineProperty(newOptional, newDate, {
      value: { ...newStat },
      writable: true,
      enumerable: true,
    });
    Object.assign(newOptional, settings.optional);
    const newSettings: ISettings = {
      wordsPerDay: settings.wordsPerDay,
      optional: newOptional,
    };

    dispatch(updateSettings({
      userId: user.userId,
      token: user.token,
      settings: newSettings,
    }));
  };

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUserSettings(user));
      dispatch(fetchUserStatistic(user));
      if (!checkDate(statistic.optional.statisticDay, getToday())) {
        const dayStat = getNewDayStat(statistic);
        sendDayStatistic(dayStat);
        dispatch(updateStatistic({
          userId: user.userId,
          token: user.token,
          statistic: { ...initialState.statistic },
        }));
      }
    }
  }, []);

  return (
    <Content id="statistics-page">
      {isLogged
        ? (
          <Tabs defaultActiveKey="1" centered size="large">
            <TabPane tab="Today" key="1">
              <OneDayStat />
            </TabPane>
            <TabPane tab="All time" key="2">
              <AllTimeStat />
            </TabPane>
          </Tabs>
        )
        : <Alert message="Please, sign up or log in to see this page" type="error" />}
    </Content>
  );
};

export default Statistics;
