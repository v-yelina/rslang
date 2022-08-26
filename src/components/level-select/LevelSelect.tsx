import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { getRandomIndex } from '../../utils/helpers/gameHelpers';
import { wordsGroups } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import './level-select.scss';
import { setCurrentGamePage } from '../../store/slices/currentGame';

const { Title, Text } = Typography;

const LevelSelect: FC = () => {
  const { gameType } = useAppSelector((state) => state.currentGame);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = (group: number) => {
    const randomPage = getRandomIndex(30).toString();
    const currentGroup = (group - 1).toString();

    dispatch(setCurrentGamePage({ group: currentGroup, page: randomPage }));
    navigate(`${gameType}`, { replace: true });
  };

  return (
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
  );
};

export default LevelSelect;
