// movendo o arco \

function adjustedPositionArc(arc, mouseX, mouseY, posCenterX, posCenterY, type) {

    var point = arc.substring(0, arc.indexOf(' '))
    var arcName = `${arc.substring(arc.indexOf(' ') + 1)}`
    var idArc = null

    for (var element of arrayArcs) {
        if (arcName == element.name) {
            idArc = arrayArcs.indexOf(element)
        }
    }

    nPointsIntermediate = arrayArcs[idArc].intermediatePoints.length

    if (point == "Start") {

        if (nPointsIntermediate == 0) {
            var arcPosFinalX = arrayArcs[idArc].endPositionArc[0][0]
            var arcPosFinalY = arrayArcs[idArc].endPositionArc[0][1]
        }
        else if (nPointsIntermediate > 0) {
            var arcPosFinalX = arrayArcs[idArc].intermediatePoints[0][0]
            var arcPosFinalY = arrayArcs[idArc].intermediatePoints[0][1]
        }

        if (type == "place") {
            var distance = Math.sqrt(Math.pow(arcPosFinalX - posCenterX,2) + Math.pow(arcPosFinalY - posCenterY,2)) 
            var shortestDistanceX = posCenterX + ((arcPosFinalX - posCenterX)/distance) * radius
            var shortestDistanceY = posCenterY + ((arcPosFinalY - posCenterY)/distance) * radius 
        }

        else if (type == "transition") {
            var shortestDistanceX =  Math.max(posCenterX, Math.min(arcPosFinalX, posCenterX + transitionWidth))
            var shortestDistanceY =  Math.max(posCenterY, Math.min(arcPosFinalY, posCenterY + transitionHeigth))
        }
        arrayArcs[idArc].startingPositionArc[0][0] = shortestDistanceX  
        arrayArcs[idArc].startingPositionArc[0][1] = shortestDistanceY    
    }

    else if (point == "Finish") {

        if (nPointsIntermediate == 0) {
            var arcPosFinalX = arrayArcs[idArc].startingPositionArc[0][0]
            var arcPosFinalY = arrayArcs[idArc].startingPositionArc[0][1]
        }

        else if (nPointsIntermediate > 0) {
            var arcPosFinalX = arrayArcs[idArc].intermediatePoints[nPointsIntermediate - 1][0]
            var arcPosFinalY = arrayArcs[idArc].intermediatePoints[nPointsIntermediate - 1][1]
        }
          
        if (type == "place") {
            var distance = Math.sqrt(Math.pow(arcPosFinalX - posCenterX,2) + Math.pow(arcPosFinalY - posCenterY,2)) 
            var shortestDistanceX = posCenterX + ((arcPosFinalX - posCenterX)/distance) * radius
            var shortestDistanceY = posCenterY + ((arcPosFinalY - posCenterY)/distance) * radius
        }

        else if (type == "transition") {
            var shortestDistanceX =  Math.max(posCenterX, Math.min(arcPosFinalX, posCenterX + transitionWidth))
            var shortestDistanceY =  Math.max(posCenterY, Math.min(arcPosFinalY, posCenterY + transitionHeigth))
        }

        arrayArcs[idArc].endPositionArc[0][0] = shortestDistanceX
        arrayArcs[idArc].endPositionArc[0][1] = shortestDistanceY
   
    }
}

function adjustedPositionArcPlace (mouseX, mouseY, posX, posY) {

    const dx = mouseX - posX;
    const dy = mouseY - posY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const adjustedX = posX + (dx / distance) * radius;
    const adjustedY = posY + (dy / distance) * radius;

    return [adjustedX, adjustedY]

}

function trianglePointsCalculation (startX, startY, endX, endY) {

        var angle = Math.atan2(endY - startY, endX - startX);

        var pointX1 = endX - triangleSize * Math.cos(angle - Math.PI / 6);
        var pointY1 = endY - triangleSize * Math.sin(angle - Math.PI / 6);
        var pointX2 = endX - triangleSize * Math.cos(angle + Math.PI / 6);
        var pointY2 = endY - triangleSize * Math.sin(angle + Math.PI / 6);

        return [pointX1, pointY1, pointX2, pointY2]

}