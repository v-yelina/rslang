import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { getRandomIndex } from '../../utils/helpers/gameHelpers';
import { wordsGroups } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PageData } from '../../store/types';
import { fetchWordsForGame } from '../../store/thunks';
import { setWordsToTrain } from '../../store/slices/currentGame';

import './level-select.scss';

const { Title, Text } = Typography;

const LevelSelect: FC = () => {
  const { gameType, wordsSource, isLoading } = useAppSelector((state) => state.currentGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getWordsFromMenu = (pageData: PageData) => {
    const { group, page } = pageData;
    dispatch(fetchWordsForGame({ group, page, user: null }));
    let index = 0;

    if (Number(page) > 0) {
      while (index < 3) {
        const newPage: string = (Number(page) - 1).toString();
        dispatch(fetchWordsForGame({ group, page: newPage, user: null }));
        index += 1;
      }
    }
  };

  const clickHandler = (group: number) => {
    const randomPage = getRandomIndex(30).toString();
    const currentGroup = (group - 1).toString();

    getWordsFromMenu({ group: currentGroup, page: randomPage });
  };

  const getWordsFromTextbook = () => {
    getWordsFromMenu({ group: '0', page: '0' });
  };

  useEffect(() => {
    dispatch(setWordsToTrain([]));

    if (wordsSource === 'textbook') {
      getWordsFromTextbook();
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigate(`${gameType}`, { replace: true });
    }
  }, [isLoading]);

  return (
    <div>
      {
        (wordsSource === 'group')
        && (
          <div className="level-select">
            <Title level={2}>{gameType?.toUpperCase()}</Title>
            <Text>Select the Level</Text>
            <div className="level-select__list">
              {
                wordsGroups.map((numberGroup) => (
                  <Button
                    id={`level-${numberGroup}`}
                    type="primary"
                    onClick={() => clickHandler(numberGroup)}
                    shape="circle"
                    size="large"
                    key={numberGroup.toString()}
                  >
                    {numberGroup}
                  </Button>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default LevelSelect;
