function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height); // Comando para limpar a área do canvas
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.linewidth = 4;
    for (var place of arrayPlaces) {  
        ctx.beginPath();
        ctx.arc(place.posX,place.posY,radius,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText(place.Name, place.posX, place.posY - 35);
        ctx.closePath();
        ctx.stroke();
    }
    for (var transition of arrayTransitions) {  
        ctx.beginPath();
        ctx.rect(transition.posX,transition.posY,transitionWidth,transitionHeigth) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.fillText(transition.Name, transition.posX, transition.posY - 20);
        ctx.closePath();
    }     
    for (var arc of arrayArcs) {
        ctx.beginPath();
        ctx.moveTo(arc.startingPositionArc[0][0], arc.startingPositionArc[0][1]);
        ctx.lineTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1]);
        ctx.closePath();
        ctx.stroke();
    }
}