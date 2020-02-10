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
    context.drawImage(image, x, y, this.side, this.side);
    context.closePath();
}

// Pawn.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
//     // console.log('----------');
//     // console.log(currentPointerLocate);
    
//     //draw mark for move
//     //row = currentPointerLocate.row + 1
//     //col = currentPointerLocate.col
//     console.log(currentFigure);
//     boardManager.clear(context);
//     boardManager.initFigures(context);
//     this.createMovementTrail(currentPointerLocate, context, currentFigure);
// }
Pawn.prototype.createMovementTrail = function(currentPointerLocate, context, currentFigure){
    var oponentFigures = currentFigure.color == 'white' ? boardManager.blackFigures : boardManager.whiteFigures;
    var trailLocation = {
        row: currentPointerLocate.row - 1,
        col: currentPointerLocate.col
    };
    if(helpers.isThisLocationInTheBoard(trailLocation)){ //check && if there is your figures or oponent figures
        var pawnTrail = new MoveTrail({
            row : trailLocation.row,
            col : trailLocation.col,
            name : 'Pawn'
        });
        pawnTrail.create(context);
        boardManager.currentMovementTrails.push(pawnTrail);
        


        // var figureToRemove = helpers.findFigureByLocation(oponentFigures, trailLocation)[0];

        // if(figureToRemove){
        //     console.log('here is figure to remove');
        //     console.log(figureToRemove);
        //     if(figureToRemove.color == 'white'){ 
        //         boardManager.whiteFigures = boardManager.whiteFigures.filter(figure => {
        //             figure.row != figureToRemove.row && figure.col != figureToRemove.col;
        //         })
        //     }else{
        //         boardManager.blackFigures = boardManager.blackFigures.filter(figure => {
        //             figure.row != figureToRemove.row && figure.col != figureToRemove.col;
        //         })
        //     }
        // }
    }
    
    //check if there is a figure in the clicked trail part - to remove this figure
    
}

Pawn.prototype.move = function(currentPointerLocate, currentFigure, context){
    //get new location for the move from the current trail coordinates
    console.log(boardManager.currentMovementTrails);
    boardManager.activeFigures.forEach((figure, index) => {
        if(figure.col == currentFigure.col & figure.row == currentFigure.row){
            var row = boardManager.activeFigures[index].row - 1;
            boardManager.activeFigures[index].row = row;
        }
    });
}

//helpers