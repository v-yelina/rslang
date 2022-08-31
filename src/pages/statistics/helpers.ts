import { gameType } from "../../store/slices/currentGame";
import { addAnswersToSliceArgs } from "../audiochallenge/Audiochallenge";

export const checkDate = (statDate:string, today: string) => {
  return statDate === today;
}

export const updateWord = (data: addAnswersToSliceArgs, game: gameType) => {
  const newRightAnswersCounter = data.answer.optional.rightAnswersCounter + 1;
  const isLearned = checkIfLearned(newRightAnswersCounter, data.answer.difficulty === 'difficult');

}

const updateGamesStat = (gameType:gameType, data: addAnswersToSliceArgs) => {
  if (gameType === 'audiochallenge' && data.isRight) {
    return {sprint: {...data.answer.optional.sprint}, audiochallenge: {rightCounter: data.answer.optional.audiochallenge.rightCounter + 1,
      wrongCounter: data.answer.optional.audiochallenge.wrongCounter}}
  }
  if (gameType === 'audiochallenge' && !data.isRight) {
    return {sprint: {...data.answer.optional.sprint}, audiochallenge: {rightCounter: data.answer.optional.audiochallenge.rightCounter,
      wrongCounter: data.answer.optional.audiochallenge.wrongCounter + 1}}
  }
  if (gameType === 'sprint' && data.isRight) {
    return {sprint: {rightCounter: data.answer.optional.sprint.rightCounter + 1,
      wrongCounter: data.answer.optional.sprint.wrongCounter}, audiochallenge: {...data.answer.optional.audiochallenge}}
  }
  if (gameType === 'sprint' && !data.isRight) {
    return {sprint: {rightCounter: data.answer.optional.sprint.rightCounter,
      wrongCounter: data.answer.optional.sprint.wrongCounter + 1}, audiochallenge: {...data.answer.optional.audiochallenge}}
  }
}

const checkIfLearned = (counter: number, isDifficult: boolean) => {
  if (counter >= 3 && !isDifficult) {
    return true;
  } 
  if (counter >= 5 && isDifficult) {
    return true;
  }
  return false;
}
