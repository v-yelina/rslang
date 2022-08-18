import React, { FC } from 'react';
import { IWord } from '../../interfaces/IWord';
import WordCard from './word-card';

const wordData = {
  id: '5e9f5ee35eb9e72bc21af4a0',
  group: 0,
  page: 0,
  word: 'alcohol',
  image: 'files/01_0002.jpg',
  audio: 'files/01_0002.mp3',
  audioMeaning: 'files/01_0002_meaning.mp3',
  audioExample: 'files/01_0002_example.mp3',
  textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
  textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
  transcription: '[ǽlkəhɔ̀ːl]',
  textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
  textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
  wordTranslate: 'алкоголь',
};

const Textbook: FC = () => (
  <>
    <h2>Textbook Page</h2>
    <WordCard wordData={wordData as IWord}/>
  </>
);

export default Textbook;
