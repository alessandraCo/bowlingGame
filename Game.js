import Player from "./Player.js";
class Game {
    //generating a new game with the number of players
    constructor(players) {
        this.numfPlayers = players;
        this.playerList = new Array(players);
        for (let i = 0; i < players; i++) {
            this.playerList[i] = new Player();
        }
    }
    //runs for the last round if it's a spare or a strike
    lastRound(player, bonus) {
        const playerScores = player.getScores();
        //pins to knock
        let pinsUp = 10;
        //spare: 1 bonus roll; strike: 2 bonus rolls
        for (let i = 0; i < bonus; i++) {
            const scoreToUpdate = playerScores[Game.frames];
            //random: pins knocked
            const random = Math.floor(Math.random() * (pinsUp + 1));
            this.roll(random);
            scoreToUpdate.setPoints(i, random);
            player.setScore(Game.frames, scoreToUpdate);
            //updating pins up
            pinsUp -= random;
        }
    }
    //runs at every roll
    roll(pinsDown) {
        console.log("--> You knocked " + pinsDown + " pins! <--");
    }
    //runs for each player: 10 frames of 2 rolls each (except if is a strike)
    play() {
        console.log("******************************");
        console.log("Welcome! Let's start the game!");
        console.log("******************************");
        let lastRound = false;
        //numberOfFrames rounds -> i: current round (from 0 to 9)
        for (let i = 0; i < Game.frames; i++) {
            if (i === Game.frames - 1) {
                lastRound = true;
            }
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
            console.log("Round " + (i + 1));
            //each Player has 2 rolls -> p: current player
            for (let p = 0; p < this.numfPlayers; p++) {
                //pins to knock
                let pinsUp = 10;
                //current player playing
                const player = this.playerList[p];
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
                console.log("Player " + (player.getId() + 1) + " it's your turn!");
                console.log("^^^^^^^^^^^^^^^^^^^^^^^^^");
                //updatedScore: initialized with the current score value
                let updatedScore = player.getScores()[i];
                //2 rolls
                for (let r = 0; r < Game.numOfRolls; r++) {
                    //checking if the first roll was a strike --> no second roll
                    if (updatedScore.getStrike()) {
                        break;
                    }
                    console.log("Roll " + (r + 1));
                    //random: pins knocked
                    const random = Math.floor(Math.random() * (pinsUp + 1));
                    //updating pins up
                    pinsUp -= random;
                    this.roll(random);
                    //updating score values
                    updatedScore.setPoints(r, random);
                    if (updatedScore.checkSpare()) {
                        console.log("It's a Spare!");
                        //if last round and is a spare
                        if (lastRound) {
                            console.log("One bonus roll!");
                            this.lastRound(player, 1);
                        }
                    }
                    if (updatedScore.checkStrike()) {
                        console.log("It's a Stike!");
                        //if last round is a strike
                        if (lastRound) {
                            console.log("Two bonus rolls!");
                            this.lastRound(player, 2);
                        }
                    }
                    player.setScore(i, updatedScore);
                    console.log("-------------------------");
                }
            }
        }
    }
    //returns the score of a single frame
    computeFrameScore(playerScore, index) {
        const currentScore = playerScore[index];
        const currentPoints = currentScore.getPoints();
        let totalFrame = currentPoints.round1 + currentPoints.round2;
        //console.log("Frame " + index + " : " + totalFrame);
        //bonus spare
        if (currentScore.getSpare()) {
            const bonus = playerScore[index + 1].getPoints().round1;
            totalFrame += bonus;
            //console.log("Spare bonus: " + bonus);
            //console.log("Frame " + index + " : " + totalFrame);
            currentScore.setFrameScore(totalFrame);
            return totalFrame;
        }
        //bonus strike
        else if (currentScore.getStrike()) {
            const bonus = playerScore[index + 1].getPoints().round1 +
                playerScore[index + 1].getPoints().round2;
            totalFrame += bonus;
            //console.log("Strike bonus: " + bonus);
            //console.log("Frame " + index + " : " + totalFrame);
            currentScore.setFrameScore(totalFrame);
            return totalFrame;
        }
        //default case
        else {
            currentScore.setFrameScore(totalFrame);
            return totalFrame;
        }
    }
    //returns the total score
    score() {
        let winnerPlayer = this.playerList[0];
        for (let j = 0; j < this.playerList.length; j++) {
            let actualPlayer = this.playerList[j];
            let totalPlayerScore = 0;
            const playerScores = actualPlayer.getScores();
            for (let i = 0; i < Game.frames; i++) {
                totalPlayerScore += this.computeFrameScore(playerScores, i);
            }
            console.log("Player " + (actualPlayer.getId() + 1) + " got " + totalPlayerScore + " scores");
            actualPlayer.setFinalScore(totalPlayerScore);
            if (actualPlayer.getFinalScore() > winnerPlayer.getFinalScore()) {
                winnerPlayer = actualPlayer;
            }
        }
        console.log("Player" + (winnerPlayer.getId() + 1) + " wins!");
    }
}
//number of frames (for each player)
Game.frames = 10;
//number of rolls for each frame (for each player)
Game.numOfRolls = 2;
export default Game;
