class Score {
    constructor() {
        //points: initialized to be zero
        this.points = { round1: 0, round2: 0 };
        //spare: true if the roll is a spare
        this.spare = false;
        //strike: true if the roll is a strike
        this.strike = false;
        //frameScore: initialized to zero, is the total score of the frame + bonus for strike or spare
        this.frameScore = 0;
    }
    setPoints(round, actualPoints) {
        switch (round) {
            case 0:
                this.points.round1 = actualPoints;
                break;
            case 1:
                this.points.round2 = actualPoints;
                break;
            default:
                throw Error;
                break;
        }
    }
    setSpare(isSpare) {
        this.spare = isSpare;
    }
    setStrike(isStrike) {
        this.strike = isStrike;
    }
    getPoints() {
        return this.points;
    }
    getSpare() {
        return this.spare;
    }
    getStrike() {
        return this.strike;
    }
    checkSpare() {
        if (!this.checkStrike() && (this.getPoints().round1 + this.getPoints().round2 === 10)) {
            this.setSpare(true);
            return true;
        }
        return false;
    }
    checkStrike() {
        if (this.getPoints().round1 === 10) {
            this.setStrike(true);
            return true;
        }
        return false;
    }
    getFrameScore() {
        return this.frameScore;
    }
    setFrameScore(actualScore) {
        this.frameScore = actualScore;
    }
}
export default Score;
