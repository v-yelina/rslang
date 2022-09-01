import React, { FC } from 'react';
import { BackTop, Empty, Spin } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { DIFFICULT_GROUP_SLICE_NUM } from '../../../../constants';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentGroup } from '../../../../store/slices/textbook';
import PaginationBlock from '../pagination';
import WordCard from '../word-card';

import './words-list.scss';

const WordsList: FC = () => {
  const { isLoading, currentWords } = useAppSelector((state) => state.textbook);
  const player = new Audio();
  const group = useAppSelector(selectCurrentGroup);

  const backTopStyle: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <div className="words-list-container">
      <BackTop>
        <div style={backTopStyle}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
      {isLoading && <Spin tip="Loading..." size="large" />}
      {!isLoading && !!currentWords.length && (
        <>
          <div className="words-list">
            {currentWords.map((word) => (
              <WordCard key={word.id} wordData={word} player={player} />
            ))}
          </div>
          {group !== DIFFICULT_GROUP_SLICE_NUM && <PaginationBlock />}
        </>
      )}
      {!isLoading && !currentWords.length && (
        <Empty description={<span>No words found. Please try again.</span>} />
      )}
    </div>
  );
};

export default WordsList;
