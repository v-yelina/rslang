import React, { FC } from 'react';
import {
  Tabs
} from 'antd';
import OneDayStat from './oneDayStat';

const Statistics: FC = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <h2>Statistics</h2>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Today" key="1">
          <OneDayStat />
        </TabPane>
      </Tabs>
    </>
  );
}


export default Statistics;
