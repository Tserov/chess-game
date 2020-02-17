var Queen = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.points = pawnObject.points;

    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Queen.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    const image = document.getElementById('queen-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

Queen.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var trailConfig = {
        figures : boardManager.activeFigures,
        trailsCollection : [],
        clickedFigure : currentFigure,
        pointerLocation : currentPointerLocate
    };
    for (let x = 0; x < 9; x++) {
        switch (x) {
            case 1:
                helpers.filterAndPushTrailCombinations(trailConfig, ['-', '+'], true, true);
                break;

            case 2:
                helpers.filterAndPushTrailCombinations(trailConfig, ['-', '-'], true, true);
                break;

            case 3:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '-'], true, true);
                break;

            case 4:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '+'], true, true);
                break;
            
            case 5:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '+'], true, false);
                break;

            case 6:
                helpers.filterAndPushTrailCombinations(trailConfig, ['-', '+'], true, false);
                break;

            case 7:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '+'], false, true);
                break;
                
            case 8:
                helpers.filterAndPushTrailCombinations(trailConfig, ['+', '-'], false, true);
                break;

            default:
                break;
        }
    }
    trailConfig.trailsCollection.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){  //check and show only trails which are in the board
            if(location.target){
                helpers.createTrail(location, 'Queen', context, 'red');
            }else{
                helpers.createTrail(location, 'Queen', context);
            }
        }
    });
}

Queen.prototype.move = function(currentPointerLocate, currentFigureLocation){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigureLocation, currentPointerLocate);
}