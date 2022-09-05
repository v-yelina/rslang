import React, { FC } from 'react';
import { Alert, Divider } from 'antd';
import Item from 'antd/lib/descriptions/Item';
import { Content } from 'antd/lib/layout/layout';
import WordsPerDay from '../wordsPerDay';
import LearnedWordsGrowth from '../learnedWordsGrowth';
import { useAppSelector } from '../../../store/hooks';
import { IDayStat } from '../../../interfaces/ISettings';

const AllTimeStat: FC = () => {
  const statistic: {
    [key: string]: IDayStat;
  } = useAppSelector((state) => state.statistic.settings.optional);
  const wordsPerDayData: { date: string; words: number }[] = [];
  const learnedWordsGrowthData: number[] = [];
  const daysStat = Object.entries(statistic);

  daysStat.forEach((elem) => {
    if (elem[0].length) {
      wordsPerDayData.push({ date: elem[0], words: elem[1].newWordsCount });
      learnedWordsGrowthData.push(elem[1].learnedWords);
    }
  });

  return (
    <Content id="all-time-tab">
      <Divider className="chart-name">New words per day:</Divider>
      <Item>
        {wordsPerDayData.length ? <LearnedWordsGrowth data={learnedWordsGrowthData} /> : <Alert message="We need more data to show this content, please play games 2 days or more" type="error" />}
        <WordsPerDay data={wordsPerDayData} />
      </Item>
      <Divider className="chart-name">Learned words growth:</Divider>
      <Item>
        {learnedWordsGrowthData.length > 1 ? <LearnedWordsGrowth data={learnedWordsGrowthData} /> : <Alert message="We need more data to show this content, please play games 2 days or more" type="error" />}
      </Item>
    </Content>
  );
};

export default AllTimeStat;
