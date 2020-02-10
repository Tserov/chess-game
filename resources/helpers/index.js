var helpers = {};

helpers.findFigureByLocation = function(figures, currentPointerLocate){
    return figures.filter(figure => {
        return figure.col == currentPointerLocate.col && figure.row == currentPointerLocate.row;
    });
}

helpers.isThisLocationInTheBoard = function(currentPointerLocate){
    return currentPointerLocate.col >= config.BOARD_COORDINATE_DIMENSION.start_col
        && currentPointerLocate.col <= config.BOARD_COORDINATE_DIMENSION.end_col
        && currentPointerLocate.row >= config.BOARD_COORDINATE_DIMENSION.start_row
        && currentPointerLocate.row <= config.BOARD_COORDINATE_DIMENSION.end_row
}