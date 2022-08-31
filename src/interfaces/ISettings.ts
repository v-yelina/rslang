export interface IDayStat {
    day: string;
    newWordsCount: number;
    gamesCount: number;
}

export interface ISettings {
    wordsPerDay: number;
    optional: IDayStat;
}
