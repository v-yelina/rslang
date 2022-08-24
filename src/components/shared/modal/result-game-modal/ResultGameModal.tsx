import React, { FC, MouseEventHandler } from 'react';
import { Typography, List, Button } from 'antd';
import WordItem from '../../word-item';
import { RightAnswer, Answer } from '../../../../store/types';
import '../modal.scss';
import './result-game-modal.scss';

type ResultProps = {
  rightWords: RightAnswer[];
  wrongWords: Answer[];
  clickHandler: MouseEventHandler;
}

const ResultGameModal: FC<ResultProps> = (props) => {
  const { rightWords, wrongWords, clickHandler } = props;

  return (
    <div className="modal">
      <Typography.Title level={3}>Результат игры</Typography.Title>
      <List
        header={(
          <div>
            <h3 className="modal__subtitle">
              Ошибок
              <span className="modal__count modal__count--wrong">
                {wrongWords.length}
              </span>
            </h3>
          </div>
        )}
        dataSource={wrongWords}
        renderItem={(item) => (
          <WordItem
            key={item.word}
            audio={item.audio}
            word={item.word}
            wordTranslate={item.wordTranslate}
          />
        )}
      />
      <List
        header={(
          <div>
            <h3 className="modal__subtitle">
              Знаю
              <span className="modal__count modal__count--success">
                {rightWords.length}
              </span>
            </h3>
          </div>
        )}
        dataSource={rightWords}
        renderItem={(item) => (
          <WordItem
            key={item.word}
            audio={item.audio}
            word={item.word}
            wordTranslate={item.wordTranslate}
          />
        )}
      />
      <Button onClick={clickHandler}>Новая игра</Button>
    </div>
  );
};

export default ResultGameModal;
