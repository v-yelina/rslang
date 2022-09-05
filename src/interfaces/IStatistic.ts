export interface IMiniGameStat {
    newWords: number;
    correctAnswers: number;
    wrongAnswers: number;
    longestCombo: number;
    gamesPlayed: number;
}

export interface IStatistic {
    learnedWords: number;
    optional: {
        statisticDay: string;
        audiochallenge: IMiniGameStat;
        sprint: IMiniGameStat;
    };
}
