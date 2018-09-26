var ship = {
    xCord: 0,
    yCord: 0,
    width: 50,
    height: 50,
    drawShip: function(){
        globals.context.fillStyle = '#0f0';
        globals.context.fillRect(this.xCord, this.yCord, this.width, this.height);
    }
}