var boardManager = {};

boardManager.init = function(canvas){
    this.context = canvas.getContext('2d');
    this.context.fillStyle = '#dcdcdc';
    this.context.fillRect(0,0,config.BOARD_HEIGHT,config.BOARD_WIDTH);
    
    this.whiteFigures = [];
    this.blackFigures = [];
    this.activeFigures = [];
    this.isActiveMovementMode = false;
    this.isActiveGameMode = false;
    this.currentMovementTrails = [];
    this.currentCoosenFigure = null;

    // this.drawBoard(this.context);
    // this.createFigures(this.context);
    // this.initFigures(this.context);
    // this.setActiveFigures(this.whiteFigures);
}
boardManager.startGame = function(){
    this.drawBoard(this.context);
    this.createFigures(this.context);
    this.initFigures(this.context);
    this.setActiveFigures(this.whiteFigures);
    this.setGameMode(true);
}

boardManager.drawBoard = function(context){
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if(x%2 == y%2){
                context.beginPath();
                context.rect(config.FIGURE_SIZE*x, config.FIGURE_SIZE*y, config.FIGURE_SIZE, config.FIGURE_SIZE);
                context.fillStyle = '#2F241B';
                context.fill();
                context.closePath();
            }else{
                context.beginPath();
                context.rect(config.FIGURE_SIZE*x, config.FIGURE_SIZE*y, config.FIGURE_SIZE, config.FIGURE_SIZE);
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
    this.currentCoosenFigure = activeFigure;
    activeFigure.createMovementTrail(pointer, this.context, activeFigure);
    this.setActiveMovementMode(true);
};
boardManager.isClickedTrail = function(pointer, currentTrails){
    var trail;
    if(currentTrails.length > 0){
        trail = currentTrails.filter(trail =>{
            return pointer.col == trail.col && pointer.row == trail.row;
        });
        return trail.length > 0;
    }
    return false;
};
boardManager.makeMove = function(pointer){
    // console.log(this.isClickedTrail(pointer, this.currentMovementTrails));
    if(this.isClickedTrail(pointer, this.currentMovementTrails)){
        console.log('Move the Figure');
        //move the figure
        this.currentCoosenFigure.move(pointer, this.currentCoosenFigure, this.context);
        this.clearMovementTrail();
        this.setGameMode(false);
    }else{
        this.clearMovementTrail();
    }
    //to save info for current trail position and active figure
    //check if current pointer is equal to current trail object(its position)
    //if it is in - make a move with the active figure
    //else delete trail and change isActiveMode to false
}

boardManager.clearMovementTrail = function(){
    this.currentMovementTrails = [];
    boardManager.clear(this.context);
    this.initFigures(this.context);
    this.isActiveMovementMode = false;
}
//helpers
boardManager.toggleActiveFigures = function(){
    this.activeFigures = this.activeFigures[0].color === 'white' ? this.blackFigures : this.whiteFigures;
}
boardManager.setActiveMovementMode = function(mode){
    this.isActiveMovementMode = mode;
}
boardManager.setGameMode = function(mode){
    this.isActiveGameMode = mode;
}
boardManager.clear = function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawBoard(context);
};

boardManager.changePlayerTurn = function(){
    this.toggleActiveFigures();
    this.clear(this.context);
    this.revertFiguresLocation(this.context);
    this.setGameMode(true);
}

boardManager.revertFiguresLocation = function(context){
    console.log('changed turn.');
    this.whiteFigures.forEach(figure => {
        figure.row = (9-figure.row);
        figure.create(context);
    });
    this.blackFigures.forEach(figure => {
        figure.row = (9-figure.row);
        figure.create(context);
    });
}