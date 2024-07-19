function insidePlace(mouseX,mouseY,placeX,placeY) {
    var a = mouseX - placeX;
    var b = mouseY - placeY;
    var c = (Math.pow(a,2) + Math.pow(b,2) <= Math.pow(radius,2))
    return c; 
}

function insideArc(mouseX,mouseY,placeX,placeY) {
    var a = mouseX - placeX;
    var b = mouseY - placeY;
    var c = (Math.pow(a,2) + Math.pow(b,2) <= Math.pow(radiusPointArc,2))
    return c; 
}

function insideTriangle(arc, mouseX, mouseY) {

    nPointsIntermediate = arc.intermediatePoints.length

    if (nPointsIntermediate == 0) {
        trianglePoints = trianglePointsCalculation (arc.startingPositionArc[0][0], arc.startingPositionArc[0][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
    }

    else if (nPointsIntermediate > 0) {
        trianglePoints = trianglePointsCalculation (arc.intermediatePoints[nPointsIntermediate - 1 ][0], arc.intermediatePoints[nPointsIntermediate - 1 ][1], arc.endPositionArc[0][0], arc.endPositionArc[0][1])
    }
  
    var x1 = arc.endPositionArc[0][0]
    var y1 = arc.endPositionArc[0][1]
    var x2 = trianglePoints[0]
    var y2 = trianglePoints[1]
    var x3 = trianglePoints[2]
    var y3 = trianglePoints[3]

    var area = (areaTriangle(x1, y1, x2, y2, x3, y3)).toFixed(4)

    var areaRef1 = areaTriangle(mouseX, mouseY, x1, y1, x2, y2);
    var areaRef2 = areaTriangle(mouseX, mouseY, x2, y2, x3, y3);
    var areaRef3 = areaTriangle(mouseX, mouseY, x3, y3, x1, y1);

    sum = (areaRef1 + areaRef2 + areaRef3).toFixed(4);

    //console.log(area, sum)
    return (area == sum)
  
}



function insideTransition(mouseX, mouseY, transitionX, transitionY) {
    var a = (mouseX >= transitionX) && (mouseX <= transitionX + transitionWidth) && (mouseY >= transitionY) && (mouseY <= transitionY + transitionHeigth)
    return a;
}

function insideNameElement(name, namePositionX, namePositionY, mouseX, mouseY) {

    var textMetrics = ctx.measureText(name);
    var textWidth = textMetrics.width;
    //console.log(textWidth)
    var textHeight = sizeFontName; 

    a = (mouseX >= namePositionX) && (mouseX <= namePositionX + textWidth) && (mouseY >= namePositionY - textHeight) && (mouseY <= namePositionY)

    b = [a, textWidth]

    //console.log(b)

    return b
    

}

function areaTriangle(x1, y1, x2, y2, x3, y3) {

    area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    return area;

}