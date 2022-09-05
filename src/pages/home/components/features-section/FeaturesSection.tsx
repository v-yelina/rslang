import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import learning from '../../../../assets/image/learning-process.webp';
import { useAppDispatch } from '../../../../store/hooks';
import {
  clearCurrentGame,
  setGameType,
  setWordsSource,
} from '../../../../store/slices/currentGame';
import { clearSprintState } from '../../../../store/slices/sprintGame';
import { GameType, WordsSourceType } from '../../../../store/types';

import './features-section.scss';

const FeaturesSection: FC = () => {
  const dispatch = useAppDispatch();

  const setSourceAndTypeGame = (source: WordsSourceType, type: GameType): void => {
    dispatch(clearCurrentGame());
    dispatch(clearSprintState());
    dispatch(setWordsSource(source));
    dispatch(setGameType(type));
  };

  return (
    <>
      <div className="features">
        <div className="features__pic">
          <img src={learning} alt="Learning words" />
        </div>
        <div className="features__text">
          <p>
            If you don&apos;t believe that learning a language might be a lot of fun, give a try to
            our application.
          </p>
          <ul className="features__items">
            <li>
              <span>Words are sorted into groups according to their difficulty.</span>
            </li>
            <li>
              <span>Two entertaining games with different modes.</span>
            </li>
            <li>
              <span>Context examples and audio provided to every word.</span>
            </li>
            <li>
              <span>We support a mobile version: play as you go!</span>
            </li>
            <li>
              <span>It is absolutely free!</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="description">
        <h2 className="description__title">
          How It
          {' '}
          <span>Works?</span>
        </h2>
        <div className="description__items">
          <div className="description__item">
            <div className="description__item--number">
              <span>1</span>
            </div>
            <p className="description__item--text">
              Visit
              {' '}
              <Link to="/textbook" className="highlighted-text">
                Textbook
              </Link>
              {' '}
              page and choose the words you want to learn today. Authorized users can mark words as
              difficult or learned.
            </p>
          </div>
          <div className="description__item">
            <div className="description__item--number">
              <span>2</span>
            </div>
            <p className="description__item--text">
              Play
              {' '}
              <Link
                to="/games"
                className="highlighted-text"
                onClick={() => setSourceAndTypeGame('group', 'audiochallenge')}
              >
                Audiochallenge
              </Link>
              {' '}
              or
              {' '}
              <Link
                to="/games"
                className="highlighted-text"
                onClick={() => setSourceAndTypeGame('group', 'sprint')}
              >
                Sprint
              </Link>
              {' '}
              game to check how well you learned words. You can choose between two play modes:
              random words or words from a specific page.
            </p>
          </div>
          <div className="description__item">
            <div className="description__item--number">
              <span>3</span>
            </div>
            <p className="description__item--text">
              Don&apos;t forget to sign up: then you will have access to statistics and will be able
              to track your progress.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
