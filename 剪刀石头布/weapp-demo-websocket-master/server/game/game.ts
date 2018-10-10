export enum GameChoice {
    Scissors = 1,
    Rock = 2,
    Paper = 3
}

export interface GameData {
    /** 剪刀石头布 */
    choice: GameChoice;

    /** 本轮得分 */
    roundScore: number;

    /** 总分 */
    totalScore: number;

    /** 连胜次数 */
    winStreak: number;
}

export function judge(choice1: GameChoice, choice2: GameChoice) {
    if (choice1 == choice2) return 0;
    if (!choice1) return 1;
    if (!choice2) return -1;
    return (choice1 - choice2 + 3) % 3 == 1 ? -1 : 1;
}