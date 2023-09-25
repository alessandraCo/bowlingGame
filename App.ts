import Game from "./Game";

 function App() {
    const game = new Game(3);
    // console.log(game);
    game.play();
    game.score();
    game.playerList.forEach(player => {
        console.table(player.getScores());
    });
}
export default App;