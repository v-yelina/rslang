import React, { FC } from 'react';
import { Divider, Space } from 'antd';
import Item from 'antd/lib/descriptions/Item';
import WordsPerDay from '../wordsPerDay';
import LearnedWordsGrowth from '../learnedWordsGrowth';
import { useAppSelector } from '../../../store/hooks';

const AllTimeStat: FC = () => {
  const statistic = useAppSelector((state) => state.statistic.settings.optional);
  const wordsPerDayData: { date: string; words: number }[] = [];
  const learnedWordsGrowthData: number[] = [];
  const daysStat = Object.entries(statistic);

  daysStat.forEach((elem) => {
    if (elem[0].length) {
      wordsPerDayData.push({ date: elem[0], words: elem[1].newWordsCount });
      learnedWordsGrowthData.push(elem[1].newWordsCount);
    }
  });

  return (
    <Space>
      <Divider>New words per day:</Divider>
      <Item>
        <WordsPerDay data={wordsPerDayData} />
      </Item>
      <Divider>Learned words growth:</Divider>
      <Item>
        <LearnedWordsGrowth data={learnedWordsGrowthData} />
      </Item>
    </Space>
  );
};

export default AllTimeStat;
