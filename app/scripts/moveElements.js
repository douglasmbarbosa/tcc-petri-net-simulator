// movendo o arco \

function adjustedPositionArc(arc, mouseX, mouseY, posCenterX, posCenterY) {

    var point = arc.substring(0, arc.indexOf(' '))
    var arcName = `${arc.substring(arc.indexOf(' ') + 1)}`
    var idArc = arcName.substring(arcName.indexOf(' ') + 1) - 1

    if (point == "Start") {

        var arcPosFinalX = arrayArcs[idArc].endPositionArc[0][0]
        var arcPosFinalY = arrayArcs[idArc].endPositionArc[0][1]

        var distance = Math.sqrt(Math.pow(arcPosFinalX - posCenterX,2) + Math.pow(arcPosFinalY - posCenterY,2)) 

        var shortestDistanceX = posCenterX + ((arcPosFinalX - posCenterX)/distance) * radius
        var shortestDistanceY = posCenterY + ((arcPosFinalY - posCenterY)/distance) * radius


        arrayArcs[idArc].startingPositionArc[0][0] = shortestDistanceX  
        arrayArcs[idArc].startingPositionArc[0][1] = shortestDistanceY  

    }

    else if (point == "Finish") {

        var arcPosFinalX = arrayArcs[idArc].startingPositionArc[0][0]
        var arcPosFinalY = arrayArcs[idArc].startingPositionArc[0][1]

        var distance = Math.sqrt(Math.pow(arcPosFinalX - posCenterX,2) + Math.pow(arcPosFinalY - posCenterY,2)) 

        var shortestDistanceX = posCenterX + ((arcPosFinalX - posCenterX)/distance) * radius
        var shortestDistanceY = posCenterY + ((arcPosFinalY - posCenterY)/distance) * radius

        arrayArcs[idArc].endPositionArc[0][0] = shortestDistanceX
        arrayArcs[idArc].endPositionArc[0][1] = shortestDistanceY

    }

}