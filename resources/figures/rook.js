var Rook = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.points = pawnObject.points;

    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Rook.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();

    const image = document.getElementById('rook-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    // context.rect(x, y, this.side, this.side)
    // context.fillStyle = this.color;
    // context.fill();
    context.closePath();
}

Rook.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var trailLocation = [];
    var trailConfig = {
        figures : boardManager.activeFigures,
        trailsCollection : [],
        clickedFigure : currentFigure,
        pointerLocation : currentPointerLocate
    };
    for (let x = 0; x < 5; x++) {
        switch (x) {
            case 1:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '+'], true, false);
                break;

            case 2:
                helpers.filterAndPushTrailCombinations(trailConfig, ['-', '+'], true, false);
                break;

            case 3:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '+'], false, true);
                break;
                
            case 4:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '-'], false, true);
                break;

            default:
                break;
        }
    }

    trailConfig.trailsCollection.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){   //check and show only trails which are in the board
            if(location.target){
                helpers.createTrail(location, 'Rook', context, 'red');
            }else{
                helpers.createTrail(location, 'Rook', context);
            }
        }
    });
}


Rook.prototype.move = function(currentPointerLocate, currentFigureLocation){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigureLocation, currentPointerLocate);
}