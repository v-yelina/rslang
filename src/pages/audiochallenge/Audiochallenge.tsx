import React, {
  FC, MouseEventHandler, useEffect, useState,
} from 'react';
import { Button, Layout } from 'antd';
import OptionsContainer from './optionsContainer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  changeAnswerColor,
  checkAnswer, getAnswerOptions, getAnswerText,
} from './audioChallengeGame';
import ENV from '../../config/config';
import ResultGame from '../../components/result-game';
import ConfirmModal from '../../components/shared/modal/confirm-modal';
import LeaveGameButton from '../../components/shared/button/leave-game-button';
import rightAnswerSound from '../../assets/sounds/right-answer.mp3';
import wrongAnswerSound from '../../assets/sounds/wrong-answer.mp3';
import {
  addRightAnswer,
  addWrongAnswer,
  changeCombo,
} from '../../store/slices/currentGame';
import AudioBtn from './audioBtn';
import RightAnswerCard from './rightAnswerCard';
import './audiochallenge.scss';

const Audiochallenge: FC = () => {
  const dispatch = useAppDispatch();
  const {
    words, randomWords, rightAnswers, wrongAnswers, maxCombo,
  } = useAppSelector((state) => state.currentGame);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);
  const [answerOptions, setAnswerOptions] = useState([...getAnswerOptions(currentWord, randomWords), "Don't know"]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);
  const [combo, setCombo] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const wordAudio = `${ENV.BASE_URL}${currentWord.audio}`;
  const rightAnswerAudio = new Audio(rightAnswerSound);
  const wrongAnswerAudio = new Audio(wrongAnswerSound);
  const { Content } = Layout;
  const imageUrl = 'https://img.freepik.com/free-vector/happy-girl-wearing-headphones-enjoying-playlist-listening-music-mobile-phone-singing-songs_74855-14053.jpg?w=1060&t=st=1662281402~exp=1662282002~hmac=fd920d75d54bb7d72a915d2c423d807706d0cd72f5d898d7d4c773d632060dd0';

  const clearOptionsId = () => {
    const optionButtons = Array.from(document.querySelectorAll('.option-btn')) as HTMLElement[];
    optionButtons.forEach((option) => {
      option.removeAttribute('id');
      option.removeAttribute('disabled');
    });
  };

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex]);

  useEffect(() => {
    setAnswerOptions([...getAnswerOptions(currentWord, randomWords), "Don't know"]);
    clearOptionsId();
  }, [currentWord]);

  const addAnswersToSlice = (
    isRight: boolean,
    answer: string,
    word: string,
    wordTranslate: string,
    audio: string,
    id: string,
  ) => {
    if (isRight) {
      rightAnswerAudio.play();
      dispatch(addRightAnswer({
        word, wordTranslate, audio, id,
      }));
      setCombo(combo + 1);
    } else {
      wrongAnswerAudio.play();
      dispatch(addWrongAnswer({
        answer, word, wordTranslate, audio, id,
      }));
      if (combo > maxCombo) {
        dispatch(changeCombo(combo));
      }
      setCombo(0);
    }
  };

  const nextWord = () => {
    if (wordIndex < words.length - 1 && wordIndex < 20) {
      setWordIndex(wordIndex + 1);
    } else {
      setIsGameFinished(true);
    }
    const nextBtn = document.querySelector('.audiochallenge__btn-next');
    if (nextBtn) {
      nextBtn.setAttribute('disabled', 'true');
    }
    setIsAnswered(false);
  };

  const handleAnswer = (userAnswer: string) => {
    let answer = userAnswer;
    let isRightAnswer: boolean;
    if (answer === "Don't know") {
      isRightAnswer = false;
      answer = '-';
    } else {
      isRightAnswer = checkAnswer(answer, currentWord.wordTranslate);
    }
    addAnswersToSlice(
      isRightAnswer,
      answer,
      currentWord.word,
      currentWord.wordTranslate,
      currentWord.audio,
      currentWord.id,
    );
    changeAnswerColor(isRightAnswer, answer, currentWord.wordTranslate);
    setIsAnswered(true);
    const nextBtn = document.querySelector('.audiochallenge__btn-next');
    if (nextBtn) {
      nextBtn.removeAttribute('disabled');
      nextBtn.addEventListener('click', nextWord);
    }
  };

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const answer = getAnswerText(e as unknown as MouseEvent);
    if (answer) {
      handleAnswer(answer);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isAnswered && !isGameFinished) {
      switch (e.code) {
        case 'Digit1':
        case 'Numpad1':
          handleAnswer(answerOptions[0]);
          break;
        case 'Digit2':
        case 'Numpad2':
          handleAnswer(answerOptions[1]);
          break;
        case 'Digit3':
        case 'Numpad3':
          handleAnswer(answerOptions[2]);
          break;
        case 'Digit4':
        case 'Numpad4':
          handleAnswer(answerOptions[3]);
          break;
        case 'Digit5':
        case 'Numpad5':
          handleAnswer(answerOptions[4]);
          break;
        case 'Digit6':
        case 'Numpad6':
          handleAnswer("Don't know");
          break;
        default:
          break;
      }
    }
    if (!isGameFinished) {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
          nextWord();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Content id="audiochallenge-page" style={{ backgroundImage: `url(${imageUrl})` }}>
      {
        !isGameFinished ? (
          <section className="game game--audiochallenge" >
            <div className='audio-right-answer__container'>
              <div className="audio">
                <AudioBtn src={wordAudio} />
              </div>
              {isAnswered && <RightAnswerCard word={currentWord} />}
            </div>
            <OptionsContainer options={answerOptions} clickHandler={(e) => handleClick(e)} />
            <Button type="primary" disabled className="audiochallenge__btn-next">Next word</Button>
          </section>
        ) : (
          <ResultGame
            rightWords={rightAnswers}
            wrongWords={wrongAnswers}
          />
        )
      }
      <div className="leave-btn" >
        <LeaveGameButton setVisible={setVisibleLeaveModal} />
        {
          isVisibleLeaveModal
          && (
            <ConfirmModal
              isVisible={isVisibleLeaveModal}
              setVisible={setVisibleLeaveModal}
            />
          )
        }
      </div >
    </Content>
  );
};

export default Audiochallenge;
