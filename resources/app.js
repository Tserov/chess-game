var canvas  = document.getElementById("chess-board");
boardManager.init();


canvas.addEventListener('mousedown', function(e){
    // console.log(e.offsetX + ' ' + e.offsetY);
    // console.log('row : ' + Math.ceil(e.offsetX / config.FIGURE_SIZE));
    var col = Math.ceil(e.offsetX / config.FIGURE_SIZE);
    var row = Math.ceil(e.offsetY / config.FIGURE_SIZE);

    boardManager.clickFigure({col,row});
});