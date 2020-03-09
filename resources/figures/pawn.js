var Pawn = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.points = pawnObject.points;
    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Pawn.prototype.create = function(context){
    var x = (this.col * this.side);
    var y = (this.row * this.side);
    const image = document.getElementById('pawn-' + this.color);
    context.beginPath();
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

Pawn.prototype.filterAndCreateTrails = function(location, context, currentPointerLocate){
    var allFigures = boardManager.whiteFigures.concat(boardManager.blackFigures);
    var oponentColor = boardManager.activeFigures[0].color == 'white' ? 'black' : 'white';
    var currentFigure = helpers.findFigureByLocation(allFigures, location)[0];
    var forwardLocation = {row: currentPointerLocate.row - 1, col: currentPointerLocate.col};
    if(!currentFigure){ //to do
        location.col == forwardLocation.col ? 
        helpers.createTrail(forwardLocation, 'King', context)
        :
        null;

    }else{
        if(currentFigure.color == oponentColor && currentFigure.col !== forwardLocation.col){
            var targetLocation = {row: currentFigure.row, col: currentFigure.col, target: true}
            helpers.createTrail(targetLocation, 'King', context, 'red');
        }
    }
}

Pawn.prototype.createMovementTrail = function(currentPointerLocate, context){
    var trailLocation = [
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col - 1
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col
        }
    ];
    trailLocation.forEach(location =>{
        if(helpers.isThisLocationInTheBoard(location)){ //check and show only trails which are in the board
            this.filterAndCreateTrails(location, context, currentPointerLocate);
        }
    });
    
}

Pawn.prototype.move = function(currentPointerLocate, currentFigure){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigure, currentPointerLocate);
}