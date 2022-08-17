import React, { FC } from 'react';
import { Modal, List, Button } from 'antd';
import { IWord } from '../../../../interfaces/IWord';
import WordItem from '../../word-item';
import '../modal.scss';
import './style.scss';

type WordItemType = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

type ResultProps = {
  rightWords: WordItemType[];
  wrongWords: WordItemType[];
}

const ResultGameModal: FC<ResultProps> = (props) => {
  const { rightWords, wrongWords } = props;

  return (
    <Modal
      visible
      className="modal modal--result"
      title="Результаты игры"
      footer={null}
    >
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
            audio={item.audio}
            word={item.word}
            wordTranslate={item.wordTranslate}
          />
        )}
      />
      <Button onClick={() => console.log('New game')}>Новая игра</Button>
    </Modal>
  );
};

export default ResultGameModal;
