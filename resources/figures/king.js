var King = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

King.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    const image = document.getElementById('king-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

King.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    console.log('here is the king');
    var trailLocation = [
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col
        },
        {
            row: currentPointerLocate.row + 1,
            col: currentPointerLocate.col
        },
        {
            row: currentPointerLocate.row,
            col: currentPointerLocate.col - 1
        },
        {
            row: currentPointerLocate.row,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row + 1,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row + 1,
            col: currentPointerLocate.col - 1
        }
    ];
    trailLocation.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){
            var kingTrail = new MoveTrail({
                row : location.row,
                col : location.col,
                name : 'King'
            });
            kingTrail.create(context);
            boardManager.currentMovementTrails.push(kingTrail);    
        }
    });
    
    
}
