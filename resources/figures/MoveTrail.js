var MoveTrail = function(moveTrailConfig){
    this.row = moveTrailConfig.row;
    this.col = moveTrailConfig.col;
    this.side = config.FIGURE_SIZE;
    this.color = moveTrailConfig.color ? moveTrailConfig.color : 'green';
}

MoveTrail.prototype.create = function(context){
    var x = (this.col * this.side);
    var y = (this.row * this.side);
    context.beginPath();
    context.lineWidth = '4';
    context.strokeStyle = this.color;
    context.rect(x, y, this.side, this.side)
    // context.fillStyle = this.color;
    context.stroke();
    context.closePath();
}
