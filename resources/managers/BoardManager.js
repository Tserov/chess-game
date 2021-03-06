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
}
boardManager.startGame = function(){
    var canvas  = document.getElementById("chess-board");
    boardManager.init(canvas);
    this.drawBoard(this.context);
    this.createFigures(this.context);
    this.initFigures(this.context);
    this.setActiveFigures(this.whiteFigures);
    this.setGameMode(true);
    helpers.printInGameTerminal('Game: Starting the game..');
}
boardManager.resetGame = function(){
    var main = document.getElementById('main');
    main.classList.remove('game-mode');
    boardManager.resetPlayersPoints();
    boardManager.clear(this.context);
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
                name: `Pawn-${currentSteck.figures.color}`,
                points: currentSteck.figures.pawn.points,
            }));
        }
        currentTypeFigures.push(new King({
            row: currentSteck.figures.king.row,
            col: currentSteck.figures.king.col,
            color: currentSteck.figures.color,
            name: `King-${currentSteck.figures.color}`,
            points: currentSteck.figures.king.points,
        }));
    
        currentTypeFigures.push(new Queen({
            row: currentSteck.figures.queen.row,
            col: currentSteck.figures.queen.col,
            color: currentSteck.figures.color,
            name: `Queen-${currentSteck.figures.color}`,
            points: currentSteck.figures.queen.points,
        }));
    
        currentTypeFigures.push(new Bishop({
            row: currentSteck.figures.bishop.row,
            col: currentSteck.figures.bishop.col,
            color: currentSteck.figures.color,
            name: `Bishop-${currentSteck.figures.color}`,
            points: currentSteck.figures.bishop.points,
        }));
        
        currentTypeFigures.push(new Knight({
            row: currentSteck.figures.knight.row,
            col: currentSteck.figures.knight.col,
            color: currentSteck.figures.color,
            name: `Knight-${currentSteck.figures.color}`,
            points: currentSteck.figures.knight.points,
        }));
    
        currentTypeFigures.push(new Rook({
            row: currentSteck.figures.rook.row,
            col: currentSteck.figures.rook.col,
            color: currentSteck.figures.color,
            name: `Rook-${currentSteck.figures.color}`,
            points: currentSteck.figures.rook.points,
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
    //to move into own method
    var clickFigureMarker = new MoveTrail({
        row : pointer.row,
        col : pointer.col,
        color : 'rgba(255,255,255, .6)'
    });
    clickFigureMarker.create(this.context);
    // helpers.createTrail({row: pointer.row, col: pointer.col}, 'clicked-figure', this.context,'rgba(255,255,255, .6)');

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
    if(this.isClickedTrail(pointer, this.currentMovementTrails)){
        this.currentCoosenFigure.move(pointer, this.currentCoosenFigure, this.currentMovementTrails); //move the figure
        this.checkForPossibleTargets(pointer);
        this.clearMovementTrail();
        this.setGameMode(false);
        helpers.printInGameTerminal(`<b>Game</b>: ${this.currentCoosenFigure.name} is moved into col:${pointer.col}, row:${pointer.row}`);
    }else{
        this.clearMovementTrail();
        helpers.printInGameTerminal(`<b>Game:</b> Selected figure is removed.`);
    }
}

boardManager.addPoints = function(color, targetFigure){
    var pointsField = document.getElementById(`${color}-player-points`);
    var availablePoints = pointsField.textContent;
    var newPoints = targetFigure.points + parseInt(availablePoints);
    pointsField.innerHTML = newPoints;
    helpers.printInGameTerminal(`<b>Game</b>: <span class="success">${color} player kills ${targetFigure.name} and gets ${newPoints} points</span>`);
}
boardManager.resetPlayersPoints = function(){
    document.getElementById(`white-player-points`).innerHTML = 0;
    document.getElementById(`black-player-points`).innerHTML = 0;
}
boardManager.setPlayerNames = function(players){
    var player1 = document.getElementById('white-player-name');
    var player2 = document.getElementById('black-player-name');
    player1.innerHTML = players.whiteFigures;
    player2.innerHTML = players.blackFigures;
}

boardManager.checkForPossibleTargets = function(pointer){
    var clickedTrail = helpers.findFigureByLocation(this.currentMovementTrails, pointer);
    if(clickedTrail[0].color == 'red'){
        switch (this.activeFigures[0].color) {
            case 'black':
                var targetFigure = helpers.findFigureByLocation(this.whiteFigures, pointer);
                this.whiteFigures = //to do
                this.whiteFigures.filter(figure => figure.col !== pointer.col || figure.row !== pointer.row);
                this.addPoints('black', targetFigure[0]);
                break;

            case 'white':
                var points = helpers.findFigureByLocation(this.blackFigures, pointer);
                this.blackFigures = //to do
                this.blackFigures.filter(figure => figure.col !== pointer.col || figure.row !== pointer.row);
                this.addPoints('white', points[0]);
                break;
        
            default:
                break;
        }
        
    }
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