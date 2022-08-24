import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { getRandomIndex } from '../../../utils/helpers/gameHelpers';

import './level-select.scss';

const { Title, Text } = Typography;

type LevelSelectProps = {
  gameName: string;
}

const LevelSelect: FC<LevelSelectProps> = (props) => {
  const { gameName } = props;
  const navigate = useNavigate();

  const clickHandler = (group: number) => {
    const randomPage = getRandomIndex(31);
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
        <Button
          type="primary"
          onClick={() => clickHandler(1)}
          shape="circle"
          size="large"
        >
          1
        </Button>
        <Button
          type="primary"
          onClick={() => clickHandler(2)}
          shape="circle"
          size="large"
        >
          2
        </Button>
        <Button
          type="primary"
          onClick={() => clickHandler(3)}
          shape="circle"
          size="large"
        >
          3
        </Button>
        <Button
          type="primary"
          onClick={() => clickHandler(4)}
          shape="circle"
          size="large"
        >
          4
        </Button>
        <Button
          type="primary"
          onClick={() => clickHandler(5)}
          shape="circle"
          size="large"
        >
          5
        </Button>
        <Button
          type="primary"
          onClick={() => clickHandler(6)}
          shape="circle"
          size="large"
        >
          6
        </Button>
      </div>
      <Button type="primary" onClick={backToHomePage}>Back to home page</Button>
    </div>
  );
};

export default LevelSelect;
