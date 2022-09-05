import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, Button } from 'antd';

import WordItem from '../shared/word-item';
import { RightAnswer, Answer } from '../../store/types';
import ENV from '../../config/config';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ResultStatistic from './result-statistic';
import { clearCurrentGame, setGameType, setWordsSource } from '../../store/slices/currentGame';
import { clearSprintState } from '../../store/slices/sprintGame';

import './result-game.scss';

type ResultProps = {
  rightWords: RightAnswer[];
  wrongWords: Answer[];
  maxCombo: number;
  amountNewWords: number | null;
}

const { Title, Text } = Typography;

const ResultGame: FC<ResultProps> = (props) => {
  const {
    rightWords,
    wrongWords,
    maxCombo,
    amountNewWords,
  } = props;
  const { gameType, wordsSource } = useAppSelector((state) => state.currentGame);
  const { score } = useAppSelector((state) => state.sprintGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    const localGame = gameType;
    const localSource = wordsSource;

    dispatch(clearSprintState());
    dispatch(clearCurrentGame());
    dispatch(setGameType(localGame));
    dispatch(setWordsSource(localSource));
    navigate('/games');
  };

  return (
    <div className="result">
      <div className="result__header">
        <Title level={3}>Results</Title>
        <Button type="primary" onClick={clickHandler}>Play again</Button>
      </div>
      {
        (gameType === 'sprint')
        && <Text id="result-score">{`Score: ${score}`}</Text>
      }
      <ResultStatistic
        rightWords={rightWords}
        wrongWords={wrongWords}
        maxCombo={maxCombo}
        amountNewWords={amountNewWords}
      />
      {
        (wrongWords.length > 0)
        && (
          <List
            id="result-wrong-answer"
            header={(
              <div>
                <h3 className="result__subtitle">
                  Mistakes
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
                  Right
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
