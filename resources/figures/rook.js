var Rook = function(pawnObject){
    this.row = pawnObject.row;
    this.col = pawnObject.col;
    this.side = config.FIGURE_SIZE;
    this.name = pawnObject.name;

    this.color = (pawnObject.color ? pawnObject.color : 'white');
}

Rook.prototype.create = function(context){

    var x = (this.col * this.side);
    var y = (this.row * this.side);

    context.beginPath();

    const image = document.getElementById('rook-' + this.color);
    context.drawImage(image, x, y, this.side, this.side);
    // context.rect(x, y, this.side, this.side)
    // context.fillStyle = this.color;
    // context.fill();
    context.closePath();
}