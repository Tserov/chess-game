var Pawn = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;

    this.color = (pawnObject.color ? pawnObject.color : '#dcdccd');
}

Pawn.prototype.create = function(context){
    
    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();
    context.rect(x, y, this.side, this.side)
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
}

Pawn.prototype.moveForward = function(){
    this.row +=1;
}