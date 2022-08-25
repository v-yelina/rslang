import React, { FC, MouseEventHandler } from 'react';
import { Typography, List, Button } from 'antd';

import WordItem from '../shared/word-item';
import { RightAnswer, Answer } from '../../store/types';
import ENV from '../../config/config';
import { useAppSelector } from '../../store/hooks';
import ResultStatistic from './result-statistic';

import './result-game.scss';

type ResultProps = {
  rightWords: RightAnswer[];
  wrongWords: Answer[];
  clickHandler: MouseEventHandler;
}

const { Title, Text } = Typography;

const ResultGame: FC<ResultProps> = (props) => {
  const { rightWords, wrongWords, clickHandler } = props;
  const { gameType } = useAppSelector((state) => state.currentGame);
  const { score } = useAppSelector((state) => state.sprintGame);

  return (
    <div className="result">
      <div className="result__header">
        <Title level={3}>Результаты игры</Title>
        <Button type="primary" onClick={clickHandler}>Играть снова</Button>
      </div>
      {
        (gameType === 'sprint')
        && <Text id="result-score">{`Очков за раунд: ${score}`}</Text>
      }
      <ResultStatistic
        rightWords={rightWords}
        wrongWords={wrongWords}
      />
      {
        (wrongWords.length > 0)
        && (
          <List
            id="result-wrong-answer"
            header={(
              <div>
                <h3 className="result__subtitle">
                  Ошибок
                  <span className="result__count result__count--wrong">
                    {wrongWords.length}
                  </span>
                </h3>
              </div>
            )}
            dataSource={wrongWords}
            renderItem={(item) => (
              <WordItem
                key={item.word}
                audio={`${ENV.BASE_URL}${item.audio}`}
                word={item.word}
                wordTranslate={item.wordTranslate}
              />
            )}
          />
        )
      }
      {
        (rightWords.length > 0)
        && (
          <List
            id="result-right-answer"
            header={(
              <div>
                <h3 className="result__subtitle">
                  Знаю
                  <span className="result__count result__count--success">
                    {rightWords.length}
                  </span>
                </h3>
              </div>
            )}
            dataSource={rightWords}
            renderItem={(item) => (
              <WordItem
                key={item.word}
                audio={`${ENV.BASE_URL}${item.audio}`}
                word={item.word}
                wordTranslate={item.wordTranslate}
              />
            )}
          />
        )
      }
    </div>
  );
};

export default ResultGame;
