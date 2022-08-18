import { WordToTrain } from '../../store/slices/currentGame/currentGameSlice';

const getTranslations = (words: WordToTrain[]) => words.reduce((prev: string[], word) => [...prev, word.wordTranslate], []);

export const getAnswerOptions = (word: WordToTrain, words: WordToTrain[]) => {
    const translations = getTranslations(words)
    const options = [word.wordTranslate];
    while (options.length < 5) {
        const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
        if (!options.includes(randomTranslation)) {
            options.push(randomTranslation)
        }
    }
    return options
}
