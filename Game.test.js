import Game from "./Game";
import Score from "./Score";
it("score points is always a number between 0 and 10", () => {
    //1 player game
    const game = new Game(1);
    game.play();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        for (const score of playerScoreArray) {
            expect(score.getPoints().round1 + score.getPoints().round2).toBeLessThanOrEqual(10);
            expect(score.getPoints().round1 + score.getPoints().round2).toBeGreaterThanOrEqual(0);
        }
    });
});
it("if score points = 10 then score isSpare = true or score isStrike = true", () => {
    //2 player game
    const game = new Game(2);
    game.play();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        for (const score of playerScoreArray) {
            if (score.getPoints().round1 === 10) {
                expect(score.getStrike()).toBeTruthy();
                //second round not played
                expect(score.getPoints().round2 === 0);
            }
            else if (score.getPoints().round1 + score.getPoints().round2 === 10) {
                expect(score.getSpare()).toBeTruthy();
            }
            else {
                expect(score.getStrike() && score.getSpare()).toBeFalsy();
            }
        }
    });
});
it("if roll = strike, no second roll", () => {
    //1 player game
    const game = new Game(1);
    game.play();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        for (const score of playerScoreArray) {
            if (score.getPoints().round1 === 10) {
                expect(score.getPoints().round2).toBe(0);
                expect(score.getStrike()).toBeTruthy();
                expect(score.getSpare()).toBeFalsy();
            }
        }
    });
});
it("if roll = strike, frameScore is the sum of the current and the next two rolls", () => {
    //2 player game
    const game = new Game(2);
    game.play();
    game.score();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        for (let i = 0; i < playerScoreArray.length; i++) {
            const score = playerScoreArray[i];
            if (score.getStrike()) {
                expect(score.getFrameScore()).toBe(score.getPoints().round1 + score.getPoints().round2 + playerScoreArray[i + 1].getPoints().round1 + playerScoreArray[i + 1].getPoints().round2);
            }
        }
    });
});
it("if roll = spare, frameScore is the sum of the current and the next roll", () => {
    //2 player game
    const game = new Game(2);
    game.play();
    game.score();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        for (let i = 0; i < playerScoreArray.length; i++) {
            const score = playerScoreArray[i];
            if (score.getSpare()) {
                expect(score.getFrameScore()).toBe(score.getPoints().round1 + score.getPoints().round2 + playerScoreArray[i + 1].getPoints().round1);
            }
        }
    });
});
it("if the last frame is NOT a strike and is NOT a spare, the points of the last two rolls of the 11th scores are zero", () => {
    //1 player game
    const game = new Game(1);
    game.play();
    //checking every score for each player in the players list
    const playerList = game.playerList;
    playerList.forEach((player) => {
        const playerScoreArray = player.getScores();
        const tenthScore = playerScoreArray[Game.frames - 1];
        if (!tenthScore.getStrike() && !tenthScore.getSpare()) {
            const eleventhScore = playerScoreArray[Game.frames];
            const defaultScore = new Score();
            expect(eleventhScore).toEqual(defaultScore);
        }
    });
});
