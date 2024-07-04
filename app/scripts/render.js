function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height); // Comando para limpar a área do canvas
    ctx.font = `${sizeFontName}px Arial`;
    ctx.fillStyle = 'black';
    //ctx.textAlign = 'center';
    ctx.linewidth = 4;
    for (var place of arrayPlaces) {  
        ctx.beginPath();
        ctx.arc(place.posX,place.posY,radius,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText(place.Name, place.namePositionX, place.namePositionY);
        ctx.closePath();
        ctx.stroke();
    }
    for (var transition of arrayTransitions) {  
        ctx.beginPath();
        ctx.rect(transition.posX,transition.posY,transitionWidth,transitionHeigth) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.fillText(transition.name, transition.namePositionX, transition.namePositionY);
        ctx.closePath();
    }  

    for (var arc of arrayArcs) {
        ctx.beginPath();

        ctx.moveTo(arc.startingPositionArc[0][0], arc.startingPositionArc[0][1]);


        ctx.lineTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        

        //console.log (startingPositionArc.length, endPositionArc.length)
        
        ctx.closePath();
        ctx.stroke();

        // Desenhar o triângulo

        trianglePoints = trianglePointsCalculation (arc.startingPositionArc[0][0], arc.startingPositionArc[0][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])

        ctx.beginPath();
        ctx.moveTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1]);
        ctx.lineTo(trianglePoints[0], trianglePoints[1]);
        ctx.lineTo(trianglePoints[2], trianglePoints[3]);
        ctx.closePath();
        ctx.fill()
    }






    // console.log (startingPositionArc.length, endPositionArc.length)
}

function renderArcAux(beginPos, endPos) {

    ctx.beginPath();
    ctx.moveTo(beginPos[0][0], beginPos[0][1]);
    ctx.lineTo(endPos[0], endPos[1])
    ctx.closePath();
    ctx.stroke();
    console.log(beginPos[0])
    console.log(endPos)
}