function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height); // Comando para limpar a área do canvas
    ctx.font = `${sizeFontName}px Arial`;
    ctx.fillStyle = 'black';
    //ctx.textAlign = 'center';
    ctx.linewidth = 4;

    //desenhando o lugar

    for (var place of arrayPlaces) {  
        ctx.beginPath();
        ctx.arc(place.posX,place.posY,radius,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText(place.name, place.namePositionX, place.namePositionY);
        textWidth = ctx.measureText(place.nTokens).width;
        textHeight = sizeFontName - 5;
        ctx.fillText(place.nTokens, place.posX - textWidth / 2, place.posY + textHeight / 2)
        ctx.closePath();
        ctx.stroke();
    }

    // desenhando a transição

    for (var transition of arrayTransitions) {  
        ctx.beginPath();
        ctx.rect(transition.posX,transition.posY,transitionWidth,transitionHeigth) // Argumentos (x,y,largura,altura)

        if (transition.isEnable && simulation) {
            ctx.fillStyle = 'red'
        }
        else {
            ctx.fillStyle = 'black'   
        }

        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'black' 
        ctx.fillText(transition.name, transition.namePositionX, transition.namePositionY);
        
    }  

    //desenhando o arco

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
            
            ctx.fill() 
            ctx.closePath() 
        }


        // Desenhar o triângulo

        nPointsIntermediate = arc.intermediatePoints.length

        if (nPointsIntermediate == 0) {
            trianglePoints = trianglePointsCalculation (arc.startingPositionArc[0][0], arc.startingPositionArc[0][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }

        else if (nPointsIntermediate > 0) {
            trianglePoints = trianglePointsCalculation (arc.intermediatePoints[nPointsIntermediate - 1 ][0], arc.intermediatePoints[nPointsIntermediate - 1 ][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }
        
        A = {x: arc.endPositionArc[0][0], y: arc.endPositionArc[0][1]}
        B = {x: trianglePoints[0], y: trianglePoints[1]}
        C = {x: trianglePoints[2], y: trianglePoints[3]}
        
        pointsWeigth = pointsWeigthCalculation(A, B)        
        arc.weightPos.x = pointsWeigth.x
        arc.weightPos.y = pointsWeigth.y

        ctx.beginPath();
        ctx.fillText(arc.weight, arc.weightPos.x, arc.weightPos.y)
        //console.log(arc.arcType)
        if (arc.type == "normal") {
            
            ctx.moveTo(A.x, A.y);
            ctx.lineTo(B.x, B.y);
            ctx.lineTo(C.x, C.y);   
            ctx.fill()
            ctx.closePath();
        }

        else if (arc.type == "inhibitor") {
            ctx.beginPath();
            ctx.fillText(arc.weight, arc.weightPos.x, arc.weightPos.y)
            ctx.arc(arc.endPositionArc[0][0], arc.endPositionArc[0][1],radiusPointInhArc,0,2*Math.PI)
            ctx.fill()
            ctx.closePath();
        }

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
            ctx.fill()  
            ctx.closePath()
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

    if (isMovingPlace) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.arc(mouseMoveX,mouseMoveY,radius,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    if (isMovingTransition) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.8)'
        ctx.rect(mouseMoveX - transitionWidth / 2,mouseMoveY - transitionHeigth / 2,transitionWidth,transitionHeigth) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.closePath();
    }
}





    
