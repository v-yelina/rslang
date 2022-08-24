import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { getRandomIndex } from '../../utils/helpers/gameHelpers';
import { wordsGroups } from '../../constants';

import './level-select.scss';

const { Title, Text } = Typography;

type LevelSelectProps = {
  gameName: string;
}

const LevelSelect: FC<LevelSelectProps> = (props) => {
  const { gameName } = props;
  const navigate = useNavigate();

  const clickHandler = (group: number) => {
    const randomPage = getRandomIndex(30);
    console.log(`group: ${group}, page: ${randomPage}`);
  };

  const backToHomePage = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="level-select">
      <Title level={2}>{gameName}</Title>
      <Text>Select the Level</Text>
      <div className="level-select__list">
        {
          wordsGroups.map((numberGroup) => (
            <Button
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
      <Button type="primary" onClick={backToHomePage}>Back to home page</Button>
    </div>
  );
};

export default LevelSelect;
