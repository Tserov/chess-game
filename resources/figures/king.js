var King = function(kingConfig){
    this.row = kingConfig.row;
    this.col = kingConfig.col;
    this.side = config.FIGURE_SIZE;
    this.name = kingConfig.name;
    this.color = (kingConfig.color ? kingConfig.color : 'white');
}

King.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    const image = document.getElementById('king-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

King.prototype.filterAndCreateTrails = function(location, context){
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

King.prototype.createMovementTrail = function(currentPointerLocate, context){
    var trailLocations = [
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
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col + 1
        },
        {
            row: currentPointerLocate.row - 1,
            col: currentPointerLocate.col - 1
        }
    ];
   
    trailLocations.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){  //check and show only trails which are in the board
            this.filterAndCreateTrails(location, context);
        }
    });
}
King.prototype.move = function(currentPointerLocate, currentFigure){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigure, currentPointerLocate);
}
