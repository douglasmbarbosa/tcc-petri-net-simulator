function cursorStyle(mouseMoveX, mouseMoveY) {
    inside = false 
    arrayPlaces.forEach(place => {
        isInsidePlace = insidePlace(mouseMoveX,mouseMoveY,place.posX,place.posY)
        insideNameElementAux = insideNameElement(place.name,place.namePositionX,place.namePositionY, mouseMoveX, mouseMoveY)      
        isInsideNameElement = insideNameElementAux[0]
        if (isInsidePlace || isInsideNameElement) {
            inside = true
        }
          
    });        
    arrayTransitions.forEach(transition => {
        isInsideTransition = insideTransition(mouseMoveX,mouseMoveY,transition.posX,transition.posY)
        insideNameElementAux = insideNameElement(transition.name,transition.namePositionX,transition.namePositionY, mouseMoveX, mouseMoveY)   
        isInsideNameElement = insideNameElementAux[0]
        if (isInsideTransition || isInsideNameElement) {
            inside = true
        }
    });
    arrayArcs.forEach(arc => {
        isInsideTriangleArc = insideTriangle(arc, mouseMoveX, mouseMoveY)
        if (isInsideTriangleArc) {
            inside = true
        }
        nIntermediatePoints = arc.intermediatePoints.length
        for (var i = 0; i < nIntermediatePoints; i++) {           
            isInsidePointArc = insideArc(mouseMoveX, mouseMoveY, arc.intermediatePoints[i][0], arc.intermediatePoints[i][1])
            if (isInsidePointArc) {
                inside = true
            }
        }  
    });
    if (inside) {
        if (isPress) {
            canvas.style.cursor = "grabbing"
        }
        else {
            canvas.style.cursor = "pointer"
        } 
    }
    else {
        canvas.style.cursor = "default"
    }
}