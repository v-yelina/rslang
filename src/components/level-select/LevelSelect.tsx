import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { getRandomIndex } from '../../utils/helpers/gameHelpers';
import { wordsGroups } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PageData } from '../../store/types';
import { fetchWordsForGame } from '../../store/thunks';

import './level-select.scss';

const { Title, Text } = Typography;
const NUMBER_WORD_GENERATION_STEPS = 3;
const LAST_PAGE = 29;

const LevelSelect: FC = () => {
  const { gameType, wordsSource, steps } = useAppSelector((state) => state.currentGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getWordsFromMenu = (pageData: PageData) => {
    const { group, page } = pageData;
    dispatch(fetchWordsForGame({ group, page, user: null }));
    let index = 0;
    let currentPage = page;

    while (index < NUMBER_WORD_GENERATION_STEPS) {
      if (Number(currentPage) <= 0) {
        currentPage = LAST_PAGE.toString();
      }
      const newPage: string = (Number(currentPage) - 1).toString();
      dispatch(fetchWordsForGame({ group, page: newPage, user: null }));
      currentPage = newPage;
      index += 1;
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
    if (wordsSource === 'textbook') {
      getWordsFromTextbook();
    }
  }, []);

  useEffect(() => {
    if (steps > NUMBER_WORD_GENERATION_STEPS && wordsSource === 'group') {
      navigate(`${gameType}`, { replace: true });
    }
  }, [steps]);

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
