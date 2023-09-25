import Score from "./Score";

class Player {
    //idInitializer: allows to auto increment players id values
    private static idInitializer : number = 0;
    //id: unique identifier for each player
    private id : number;
    //scores: the score array of the 10 frames: at the end of the game its length should be between 10 and 12
    private scores : [Score, Score, Score, Score, Score, Score, Score, Score, Score, Score, Score];
    //total score: score at the end of the game
    private finalScore : number = 0;

    //every player is initialized with an id and a Tuple of 12 default Scores (points:0, spare: false, strike: false)
    public constructor() {
        this.id = Player.idInitializer;
        Player.idInitializer++;
        let defaultScoreArray : [Score, Score, Score, Score, Score, Score, Score, Score, Score, Score, Score] = [new Score(),new Score(), new Score(),new Score(), new Score(),new Score(), new Score(), new Score(), new Score(), new Score(), new Score()];
        this.scores = defaultScoreArray;
    }

    public getId() {
        return this.id;
    }

    public getScores() {
        return this.scores;
    }

    //updating scores array at each roll
    public setScore(scoreIndex : number, effectiveScore : Score) {
        this.scores[scoreIndex] = effectiveScore;
    }

    public getFinalScore() {
        return this.finalScore;
    }

    public setFinalScore(finalScore : number) {
        this.finalScore = finalScore;
    }
}

export default Player;