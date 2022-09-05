interface WordTranslateProp {
  wordTranslate: string;
}

// eslint-disable-next-line
export const getTranslations = <T extends WordTranslateProp>(words: T[]) => words
  .reduce((prev: string[], word) => [...prev, word.wordTranslate], []);
