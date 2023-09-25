class Score {
  //points: initialized to be zero
  private points: {
    round1: number;
    round2: number;
  } = { round1: 0, round2: 0 };
  //spare: true if the roll is a spare
  private spare: boolean = false;
  //strike: true if the roll is a strike
  private strike: boolean = false;
  //frameScore: initialized to zero, is the total score of the frame + bonus for strike or spare
  private frameScore  : number = 0;

  public setPoints(round: number, actualPoints: number) {
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

  public setSpare(isSpare: boolean) {
    this.spare = isSpare;
  }

  public setStrike(isStrike: boolean) {
    this.strike = isStrike;
  }

  public getPoints() {
    return this.points;
  }

  public getSpare() {
    return this.spare;
  }

  public getStrike() {
    return this.strike;
  }

  public checkSpare() {
    if (!this.checkStrike() && (this.getPoints().round1 + this.getPoints().round2 === 10)) {
      this.setSpare(true);
      return true;
    }
    return false;
  }

  public checkStrike() : boolean {
    if (this.getPoints().round1 === 10) {
      this.setStrike(true);
      return true;
    }
    return false;
  }

  public getFrameScore() {
    return this.frameScore;
  }

  public setFrameScore(actualScore : number) {
    this.frameScore = actualScore;
  }
}

export default Score;
