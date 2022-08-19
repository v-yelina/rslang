import React, { FC } from 'react';
import { Typography, List, Button } from 'antd';
import { IWord } from '../../../../interfaces/IWord';
import WordItem from '../../word-item';
import '../modal.scss';
import './result-game-modal.scss';

type WordItemType = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

type ResultProps = {
  rightWords: WordItemType[];
  wrongWords: WordItemType[];
}

const ResultGameModal: FC<ResultProps> = (props) => {
  const { rightWords, wrongWords } = props;

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
