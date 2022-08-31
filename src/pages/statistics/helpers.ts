import { gameType } from "../../store/slices/currentGame";
import { addAnswersToSliceArgs } from "../audiochallenge/Audiochallenge";

export const checkDate = (statDate:string, today: string) => {
  return statDate === today;
}

export const updateWord = (data: addAnswersToSliceArgs, game: gameType) => {

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
