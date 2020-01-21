var boardManager = {};

boardManager.init = function(context){
    context = canvas.getContext('2d');
    context.fillStyle = '#dcdcdc';
    context.fillRect(0,0,config.BOARD_HEIGHT,config.BOARD_WIDTH);
    
    this.whiteFigures = [];
    this.blackFigures = [];
    this.activePlayer = null;
    
    this.drawBoard(context);
    this.createFigures(context);
    this.initFigures(context);

    // this.whiteFigures[1].moveForward();
    // boardManager.clear(context);
    // this.initFigures(context);
}

boardManager.drawBoard = function(context){
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if(x%2 == y%2){
                context.beginPath();
                context.rect(80*x, 80*y, 80, 80)
                context.fillStyle = 'black';
                context.fill();
                context.closePath();
            }else{
                context.beginPath();
                context.rect(80*x, 80*y, 80, 80)
                context.fillStyle = 'white';
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
                row: currentSteck.figures.pawn.row,
                col: i,
                color: 'red'
            }));
        }
        currentTypeFigures.push(new King({
            row: currentSteck.figures.king.row,
            col: currentSteck.figures.king.col,
            color: 'green'
        }));
    
        currentTypeFigures.push(new Queen({
            row: currentSteck.figures.queen.row,
            col: currentSteck.figures.queen.col,
            color: 'yellow'
        }));
    
        currentTypeFigures.push(new Bishop({
            row: currentSteck.figures.bishop.row,
            col: currentSteck.figures.bishop.col,
            color: 'brown'
        }));
        
        currentTypeFigures.push(new Knight({
            row: currentSteck.figures.knight.row,
            col: currentSteck.figures.knight.col,
            color: 'blue'
        }));
    
        currentTypeFigures.push(new Rook({
            row: currentSteck.figures.rook.row,
            col: currentSteck.figures.rook.col,
            color: 'silver'
        }));
        
        if(index === 1){
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

boardManager.clickFigure = function(pointer){
    var arr = this.whiteFigures.filter(figure => {
        return figure.col == pointer.col && figure.row == pointer.row;
    });
    console.log(arr);
};

boardManager.clear = function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.drawBoard(context);
};