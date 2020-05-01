var canvas  = document.getElementById("chess-board");
// boardManager.init(canvas);
var main = document.getElementById('main');
var gameWrap = document.getElementsByClassName('game-wrap')[0];
var startGameBtn = document.getElementById('start-game');
var playGameBtn = document.getElementById('play-game');
var changeTurnBtn = document.getElementById('change-turn');
var toggleTurnBtn = changeTurnBtn.getElementsByClassName('toggle')[0];
var startingScreen = document.getElementById('starting-screen');
var resetGameBtn = document.getElementById('reset-game');

startGameBtn.addEventListener('click', function(){
    startingScreen.classList.add('play-mode');
});

playGameBtn.addEventListener('click', function(){
    var player1 = document.getElementById('player1');
    var player2 = document.getElementById('player2');
    var playerNames = {
        whiteFigures: player1.value ? player1.value : 'player1',
        blackFigures: player2.value ? player2.value : 'player2',
    };
    boardManager.setPlayerNames(playerNames);
    startingScreen.classList.remove('play-mode');
    main.classList.add('game-mode');
    boardManager.startGame();
    player1.value = 'player1';
    player2.value = 'player2';
});

resetGameBtn.addEventListener('click', function(){
    boardManager.resetGame();
});
canvas.addEventListener('mousedown', function(e){
    var col = Math.ceil(e.offsetX / config.FIGURE_SIZE)-1;
    var row = Math.ceil(e.offsetY / config.FIGURE_SIZE)-1;
    var pointer = {col, row};
    var isActiveMovementMode = boardManager.isActiveMovementMode;
    var activeFigure = boardManager.getClickedFigure(pointer) ? boardManager.getClickedFigure(pointer) : null;
    console.log('col: ' + col + ', row: ' + row);
    if(boardManager.isActiveGameMode){
        if(isActiveMovementMode){
            boardManager.makeMove(pointer);
        }else{
            if(activeFigure){
                boardManager.showFigureTrailMovement(pointer, activeFigure);
                console.log(activeFigure);
                helpers.printInGameTerminal(`<b>Game</b>: ${activeFigure.name} is choosen.`);
            }else{
                console.log('Please choose one of your figures!');
                helpers.printInGameTerminal('<b>Game</b>: <span class="danger">Please choose one of your figures to play!</span>');
            }
        }
    }else{
        console.log('Game mode is not activated');
        helpers.printInGameTerminal('<b>Game</b>: <span class="danger">Change turn!</span>');
    }
});

toggleTurnBtn.addEventListener('click', function(){
    if(!boardManager.isActiveGameMode){
        boardManager.changePlayerTurn(); 
        if(changeTurnBtn.classList.contains('active')){
            changeTurnBtn.classList.remove('active');
            gameWrap.style.transform = 'rotate(0deg)';
        }else{
            changeTurnBtn.classList.add('active');
            gameWrap.style.transform = 'rotate(360deg)';
        }
    }else{
        helpers.printInGameTerminal('<b>Game</b>: <span class="danger">It is your turn!</span>');
        console.log('Game mode is activated');
    }
});