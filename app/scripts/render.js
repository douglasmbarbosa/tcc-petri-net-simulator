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
        var n = 0
        for (var points of arc.intermediatePoints) {
            ctx.lineTo(points[0], points[1])  
        }
        ctx.lineTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        ctx.stroke();
        ctx.closePath();      
        for (var points of arc.intermediatePoints) {
            ctx.beginPath()
            ctx.arc(points[0],points[1],radiusPointArc,0,2*Math.PI)
            ctx.closePath()
            ctx.fill()  
        }

        // Desenhar o triângulo

        nPointsIntermediate = arc.intermediatePoints.length

        if (nPointsIntermediate == 0) {
            trianglePoints = trianglePointsCalculation (arc.startingPositionArc[0][0], arc.startingPositionArc[0][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }

        else if (nPointsIntermediate > 0) {
            trianglePoints = trianglePointsCalculation (arc.intermediatePoints[nPointsIntermediate - 1 ][0], arc.intermediatePoints[nPointsIntermediate - 1 ][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }
         
        ctx.beginPath();
        ctx.moveTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1]);
        ctx.lineTo(trianglePoints[0], trianglePoints[1]);
        ctx.lineTo(trianglePoints[2], trianglePoints[3]);
        ctx.closePath();
        ctx.fill()
    }

    // mostra o arco enquanto ele é feito

    if (drawArc == true && startingPositionArc.length > 0 && endPositionArc.length == 0) {
        ctx.beginPath();
        ctx.moveTo(startX, startY)
        for (var points of intermediatePoints) {
            ctx.lineTo(points[0], points[1])  
        }
        ctx.lineTo(finalX, finalY) 
        ctx.stroke()
        ctx.closePath()
        for (var points of intermediatePoints) {
            ctx.beginPath()
            ctx.arc(points[0],points[1],radiusPointArc,0,2*Math.PI)
            ctx.closePath()
            ctx.fill()  
        }

        nPointsIntermediate = intermediatePoints.length

        if (nPointsIntermediate == 0) {
            trianglePoints = trianglePointsCalculation (startX, startY, finalX, finalY)
        }

        else if (nPointsIntermediate > 0) {
             trianglePoints = trianglePointsCalculation (intermediatePoints[nPointsIntermediate - 1 ][0], intermediatePoints[nPointsIntermediate - 1 ][1], finalX, finalY)
        }      
        ctx.beginPath();
        ctx.moveTo(finalX, finalY);
        ctx.lineTo(trianglePoints[0], trianglePoints[1]);
        ctx.lineTo(trianglePoints[2], trianglePoints[3]);
        ctx.closePath();
        ctx.fill()
    }
}


    
