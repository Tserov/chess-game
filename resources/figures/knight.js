var Knight = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.points = pawnObject.points;
    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Knight.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    const image = document.getElementById('knight-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

Knight.prototype.filterAndCreateTrails = function(location, context){
    var allFigures = boardManager.whiteFigures.concat(boardManager.blackFigures);
    var oponentColor = boardManager.activeFigures[0].color == 'white' ? 'black' : 'white';
    var currentFigure = helpers.findFigureByLocation(allFigures, location)[0];

    if(!currentFigure){ //check if there are any of your own figures around, which stay on the current fig way
        helpers.createTrail(location, 'King', context);
    }else{
        if(currentFigure.color == oponentColor){
            var targetLocation = {row: currentFigure.row, col: currentFigure.col, target: true}
            helpers.createTrail(targetLocation, 'King', context, 'red');
        }
    }
}

Knight.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var knightMovementLocations = [
        {
            row: currentPointerLocate.row - 3,
            col: currentPointerLocate.col - 1
        },
        {
            row: currentPointerLocate.row - 3,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row + 3,
            col: currentPointerLocate.col - 1
        },
        {
            row: currentPointerLocate.row + 3,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row + 1,
            col: currentPointerLocate.col - 3
        },
        {
            row: currentPointerLocate.row + 1,
            col: currentPointerLocate.col + 3
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col - 3
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col + 3
        }
    ];

    knightMovementLocations.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){ //check and show only trails which are in the board
            this.filterAndCreateTrails(location, context); 
        }
    });
}
Knight.prototype.move = function(currentPointerLocate, currentFigure){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigure, currentPointerLocate);
}