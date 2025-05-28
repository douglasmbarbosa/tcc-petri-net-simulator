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
        if (nPointsIntermediate == 0) {
            circleXY = centerCircle(arc.startingPositionArc[0][0], arc.startingPositionArc[0][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }
        else if (nPointsIntermediate > 0) {
            circleXY = centerCircle(arc.intermediatePoints[nPointsIntermediate - 1 ][0], arc.intermediatePoints[nPointsIntermediate - 1 ][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
        }
        ctx.arc(circleXY[0],circleXY[1],radiusPointInhArc,0,2*Math.PI)
        ctx.fill()
        ctx.closePath();
    }
}
