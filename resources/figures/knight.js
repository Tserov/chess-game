var Knight = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;

    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Knight.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    const image = document.getElementById('knight-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    // context.rect(x, y, this.side, this.side)
    // context.fillStyle = this.color;
    // context.fill();
    context.closePath();
}

Knight.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var row = currentFigure.color == 'black' ? currentPointerLocate.row + 3 : currentPointerLocate.row - 3;
    var col = currentPointerLocate.col + 1;
    var knightTrail = new MoveTrail({
        row : row,
        col : col,
        name : 'Knight'
    });
    knightTrail.create(context);
    boardManager.currentMovementTrails.push(knightTrail);
}
Knight.prototype.move = function(currentPointerLocate, currentFigure, context){
    console.log(boardManager.currentMovementTrails);
    boardManager.activeFigures.forEach((figure, index) => {
        if(figure.col == currentFigure.col & figure.row == currentFigure.row){
            var row = boardManager.activeFigures[index].row + 3;
            var col = boardManager.activeFigures[index].col + 1;
            boardManager.activeFigures[index].row = row;
            boardManager.activeFigures[index].col = col;
        }
    });
}