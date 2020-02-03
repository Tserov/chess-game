var Pawn = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    // this.image = this.image ? this.image : document.getElementById('pawn-white');
    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Pawn.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);
    const image = document.getElementById('pawn-' + this.color);
    context.beginPath();
    // context.rect(x, y, this.side, this.side)
    // context.fillStyle = this.color;
    // context.fill();
    context.drawImage(image, x, y, this.side, this.side);

    context.closePath();
}

// Pawn.prototype.createMovementTrail = function(currentLocatePointer, context, currentFigure){
//     // console.log('----------');
//     // console.log(currentLocatePointer);
    
//     //draw mark for move
//     //row = currentLocatePointer.row + 1
//     //col = currentLocatePointer.col
//     console.log(currentFigure);
//     boardManager.clear(context);
//     boardManager.initFigures(context);
//     this.createMovementTrail(currentLocatePointer, context, currentFigure);
// }
Pawn.prototype.createMovementTrail = function(currentLocatePointer, context, currentFigure){
    var row = currentFigure.color == 'black' ? currentLocatePointer.row + 1 : currentLocatePointer.row - 1;
    var pawnTrail = new MoveTrail({
        row : row,
        col : currentLocatePointer.col,
        name : 'Pawn'
    });
    pawnTrail.create(context);
    boardManager.currentMovementTrail = pawnTrail;
}