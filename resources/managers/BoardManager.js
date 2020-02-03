var boardManager = {};

boardManager.init = function(canvas){
    this.context = canvas.getContext('2d');
    this.context.fillStyle = '#dcdcdc';
    this.context.fillRect(0,0,config.BOARD_HEIGHT,config.BOARD_WIDTH);
    
    this.whiteFigures = [];
    this.blackFigures = [];
    this.activeFigures = [];
    this.isActiveMovementMode = false;
    this.currentMovementTrail = {};

    this.drawBoard(this.context);
    this.createFigures(this.context);
    this.initFigures(this.context);
    this.setActiveFigures(this.blackFigures);
}

boardManager.drawBoard = function(context){
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if(x%2 == y%2){
                context.beginPath();
                context.rect(80*x, 80*y, 80, 80);
                context.fillStyle = '#2F241B';
                context.fill();
                context.closePath();
            }else{
                context.beginPath();
                context.rect(80*x, 80*y, 80, 80);
                context.fillStyle = '#e3bf88';
                context.fill();
                context.closePath();
            }
        }
        
    }
}

boardManager.createFigures = function(context){
    
    config.FIGURES_LOCATION.forEach((currentSteck, index) => {
        var currentTypeFigures = [];
       
        for (let i = 0; i < 5; i++) {
            currentTypeFigures.push(new Pawn({
                color: currentSteck.figures.color,
                row: currentSteck.figures.pawn.row,
                col: i,
                name : "Pawn"
            }));
        }
        currentTypeFigures.push(new King({
            row: currentSteck.figures.king.row,
            col: currentSteck.figures.king.col,
            color: currentSteck.figures.color,
            name: 'King'
        }));
    
        currentTypeFigures.push(new Queen({
            row: currentSteck.figures.queen.row,
            col: currentSteck.figures.queen.col,
            color: currentSteck.figures.color,
            name: 'Queen'
        }));
    
        currentTypeFigures.push(new Bishop({
            row: currentSteck.figures.bishop.row,
            col: currentSteck.figures.bishop.col,
            color: currentSteck.figures.color,
            name: 'Bishop'
        }));
        
        currentTypeFigures.push(new Knight({
            row: currentSteck.figures.knight.row,
            col: currentSteck.figures.knight.col,
            color: currentSteck.figures.color,
            name: 'Knight'
        }));
    
        currentTypeFigures.push(new Rook({
            row: currentSteck.figures.rook.row,
            col: currentSteck.figures.rook.col,
            color: currentSteck.figures.color,
            name: 'Rook'
        }));
        
        if(index === 0){
            this.whiteFigures = currentTypeFigures;
        }else{
            this.blackFigures = currentTypeFigures;
        }

    });
}

boardManager.initFigures = function(context){
    this.whiteFigures.forEach(figure => {
        figure.create(context);
    });
    this.blackFigures.forEach(figure => {
        figure.create(context);
    });
};

boardManager.setActiveFigures = function(figures){
    this.activeFigures = figures;
}

boardManager.getClickedFigure = function(pointer){
    var targetFigure = this.activeFigures.filter(figure => {
        return figure.col == pointer.col && figure.row == pointer.row;
    });
    
    return targetFigure[0] ? targetFigure[0] : null;
}

boardManager.showFigureTrailMovement = function(pointer, activeFigure){
    activeFigure.createMovementTrail(pointer, this.context, activeFigure);
    this.setIsActiveMovementMode(true);
};

boardManager.makeMove = function(pointer){
    if(pointer.col == this.currentMovementTrail.col && pointer.row == this.currentMovementTrail.row){
        console.log('Move the Figure');
        //move the figure
        this.toggleActiveFigures();
        this.clearMovementTrail();
    }else{
        this.clearMovementTrail();
    }
    //to save info for current trail position and active figure
    //check if current pointer is equal to current trail object(its position)
    //if it is in - make a move with the active figure
    //else delete trail and change isActiveMode to false
}

boardManager.clearMovementTrail = function(){
    this.currentMovementTrail = {};
    boardManager.clear(this.context);
    this.initFigures(this.context);
    this.isActiveMovementMode = false;
}
//helpers
boardManager.toggleActiveFigures = function(){
    this.activeFigures = this.activeFigures[0].color === 'white' ? this.blackFigures : this.whiteFigures;
}
boardManager.setIsActiveMovementMode = function(mode){
    this.isActiveMovementMode = mode;
}

boardManager.clear = function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawBoard(context);
};