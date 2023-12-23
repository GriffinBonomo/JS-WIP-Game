export default class HighScore {
    static getScore() {
        const highScore = JSON.parse(localStorage.getItem('highScore')) ?? 0;

        return highScore;
    }

    static setScore(score){
        localStorage.setItem('highScore', JSON.stringify(score))
    }
}