export interface IDayStat {
    newWordsCount: number;
    gamesCount: number;
}

export interface ISettings {
    wordsPerDay: number;
    optional: {
        [key: string]: IDayStat[]
    };
}
