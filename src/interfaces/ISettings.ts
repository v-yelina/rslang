export interface IDayStat {
    day: Date;
    newWordsCount: number;
    gamesCount: number;
}

export interface ISettings {
    wordsPerDay: number;
    optional: {};
}
