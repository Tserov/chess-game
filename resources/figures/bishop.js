var Bishop = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;
    this.points = pawnObject.points;
    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Bishop.prototype.create = function(context){
    var x = (this.col * this.side);
    var y = (this.row * this.side);
    context.beginPath();
    const image = document.getElementById('bishop-' + this.color);
    context.beginPath();
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

Bishop.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var trailConfig = {
        trailsCollection : [],
        clickedFigure : currentFigure,
        pointerLocation : currentPointerLocate
    };
    for (let x = 0; x < 5; x++) {
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

            default:
                break;
        }
    }
    
    // for (let i = 0; i < 10; i++) {
    //     trailLocation.push({
    //         row: currentPointerLocate.row - i,
    //         col: currentPointerLocate.col + i
    //     },
    //     {
    //         row: currentPointerLocate.row - i,
    //         col: currentPointerLocate.col - i
    //     },
    //     {
    //         row: currentPointerLocate.row + i,
    //         col: currentPointerLocate.col - i
    //     },
    //     {
    //         row: currentPointerLocate.row + i,
    //         col: currentPointerLocate.col + i
    //     });
    // }

    trailConfig.trailsCollection.forEach(location => {
        if(helpers.isThisLocationInTheBoard(location)){  //check and show only trails which are in the board
            if(location.target){
                helpers.createTrail(location, 'Bishop', context, 'red');
            }else{
                helpers.createTrail(location, 'Bishop', context);
            }
        }
    });
}
Bishop.prototype.move = function(currentPointerLocate, currentFigureLocation, trailsCollection){
    helpers.setExactFigureLocation(boardManager.activeFigures, currentFigureLocation, currentPointerLocate);
}