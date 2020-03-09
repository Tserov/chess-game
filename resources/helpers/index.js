var helpers = {};

helpers.findFigureByLocation = function(figures, location){
    return figures.filter(figure => {
        return figure.col == location.col && figure.row == location.row;
    });
}

helpers.isThisLocationInTheBoard = function(currentPointerLocate){
    return currentPointerLocate.col >= config.BOARD_COORDINATE_DIMENSION.start_col
        && currentPointerLocate.col <= config.BOARD_COORDINATE_DIMENSION.end_col
        && currentPointerLocate.row >= config.BOARD_COORDINATE_DIMENSION.start_row
        && currentPointerLocate.row <= config.BOARD_COORDINATE_DIMENSION.end_row
}

helpers.ovalSignAndCalcTwoParams = function(x,y,operator){
    switch (operator) {
        case '-':
            return x-y;
            break;
        case '+':
            return x+y;
            break;
        default:
            break;
    }
}

helpers.filterAndPushTrailCombinations = function(trailConfig, signs, increaseRow, increaseCol){
    var oponentColor = boardManager.activeFigures[0].color == 'white' ? 'black' : 'white';
    var allFigures = boardManager.whiteFigures.concat(boardManager.blackFigures);

    for (let i = 0; i < 10 ; i++) {

        var location = {
            row: helpers.ovalSignAndCalcTwoParams(trailConfig.pointerLocation.row, increaseRow ? i : 0, signs[0]),
            col: helpers.ovalSignAndCalcTwoParams(trailConfig.pointerLocation.col, increaseCol ? i : 0, signs[1])
        };

        currentFig = helpers.findFigureByLocation(allFigures, location)[0];
        if(!currentFig){
            trailConfig.trailsCollection.push(location);
        }else{
            if(currentFig.name !== trailConfig.clickedFigure.name){
                if(currentFig.color == oponentColor){
                    var targetLocation = {row: currentFig.row, col: currentFig.col, target: true}
                    trailConfig.trailsCollection.push(targetLocation);
                    break;
                }else{
                    break;
                }
            }
        }
    }
}

helpers.createTrail = function(location, trailName, context, color){
    var trail = new MoveTrail({
        row : location.row,
        col : location.col,
        name : trailName,
        color : color ? color : 'green'
    });
    console.log(trail);
    trail.create(context);
    boardManager.currentMovementTrails.push(trail); 
}

helpers.getOponentFigures = function(){
    if(boardManager.activeFigures[0]){
        return boardManager.activeFigures[0].color == "black" ? boardManager.whiteFigures : boardManager.blackFigures;
    }
}

helpers.setExactFigureLocation = function(figures, currentFigureLocation, currentPointerLocate){
    figures.forEach((figure, index) => {
        if(figure.col == currentFigureLocation.col & figure.row == currentFigureLocation.row){
            figures[index].row = currentPointerLocate.row;
            figures[index].col = currentPointerLocate.col;
        }
    });
}

helpers.removeFigureByCollection = function(figuresCollection, location){
    return figuresCollection.filter(figure => figure.row !== location.row && figure.col !== location.col);
}