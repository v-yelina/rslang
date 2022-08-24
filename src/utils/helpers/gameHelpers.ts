interface WordTranslateProp {
  wordTranslate: string;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = <T>(array: T[]): T[] => {
  const arrayToShuffle = [...array];

  for (let i = arrayToShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
  }

  return arrayToShuffle;
};

export const checkAnswer = (answer:string, word:string): boolean => answer === word;

export const getRandomIndex = (arraySize: number): number => Math.floor(Math.random() * arraySize);

export const getTranslations = <T extends WordTranslateProp>(words: T[]) => (
  words.reduce((prev: string[], word) => [...prev, word.wordTranslate], []));
