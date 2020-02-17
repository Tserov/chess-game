var canvas  = document.getElementById("chess-board");
boardManager.init(canvas);

var main = document.getElementById('main');
var gameWrap = document.getElementsByClassName('game-wrap')[0];
var startGameBtn = document.getElementById('start-game');
var changeTurnBtn = document.getElementById('change-turn');
var toggleTurnBtn = changeTurnBtn.getElementsByClassName('toggle')[0];
startGameBtn.addEventListener('click', function(){
    main.classList.add('game-mode');
    boardManager.startGame();
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
            }else{
                alert('Please choose one of your figures!');
            }
        }
    }else{
        alert('Game mode is not activated');
    }
});

toggleTurnBtn.addEventListener('click', function(){
    boardManager.changePlayerTurn(); 
    if(changeTurnBtn.classList.contains('active')){
        changeTurnBtn.classList.remove('active');
        gameWrap.style.transform = 'rotate(0deg)';
    }else{
        changeTurnBtn.classList.add('active');
        gameWrap.style.transform = 'rotate(360deg)';
    }
});