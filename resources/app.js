var canvas  = document.getElementById("chess-board");
boardManager.init(canvas);

canvas.addEventListener('mousedown', function(e){
    var col = Math.ceil(e.offsetX / config.FIGURE_SIZE)-1;
    var row = Math.ceil(e.offsetY / config.FIGURE_SIZE)-1;

    console.log('col: ' + col + ', row: ' + row);
    var pointer = {col, row};

    var isActiveMovementMode = boardManager.isActiveMovementMode;
    var activeFigure = boardManager.getClickedFigure(pointer) ? boardManager.getClickedFigure(pointer) : null;
    
    if(isActiveMovementMode){
        boardManager.makeMove(pointer);
    }else{
        if(activeFigure){
            boardManager.showFigureTrailMovement(pointer, activeFigure);
        }else{
            alert('Please choose one of your figures!');
        }
    }
});
