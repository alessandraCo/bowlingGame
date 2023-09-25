import Score from "./Score.js";
class Player {
    //every player is initialized with an id and a Tuple of 12 default Scores (points:0, spare: false, strike: false)
    constructor() {
        //total score: score at the end of the game
        this.finalScore = 0;
        this.id = Player.idInitializer;
        Player.idInitializer++;
        let defaultScoreArray = [new Score(), new Score(), new Score(), new Score(), new Score(), new Score(), new Score(), new Score(), new Score(), new Score(), new Score()];
        this.scores = defaultScoreArray;
    }
    getId() {
        return this.id;
    }
    getScores() {
        return this.scores;
    }
    //updating scores array at each roll
    setScore(scoreIndex, effectiveScore) {
        this.scores[scoreIndex] = effectiveScore;
    }
    getFinalScore() {
        return this.finalScore;
    }
    setFinalScore(finalScore) {
        this.finalScore = finalScore;
    }
}
//idInitializer: allows to auto increment players id values
Player.idInitializer = 0;
export default Player;
