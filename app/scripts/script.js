function loop() {
    window.requestAnimationFrame(loop, canvas);
    render();
    buttonColors();
    if (simulation) {
        netSimulationEnables()
    }
}

canvas.addEventListener('mousedown', (event) => {
    //Obtendo posição do ponteiro do mouse

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    //Verifica se o botão pressionado foi o esquerdo  
    if (event.button == 0) {
        isPress = true
    }

    if (!simulation) {

        if (buttonPress == 1) {
            addPlace(mouseX, mouseY);
            buttonPress = 0;     
        }

        if (buttonPress == 2) {
            addTransition(mouseX, mouseY);
            buttonPress = 0;
        }

        if (buttonPress == 3 || buttonPress == 4) {
            addArc(mouseX, mouseY)
            if (drawArc == false) {
                buttonPress = 0
            }
        }   
        
        if (buttonPress == 5) {
            deleteElements(mouseX, mouseY)
        }

        if (buttonPress == 6) {
            
        
        }

        for (var place of arrayPlaces) {
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            insideNameElementAux = insideNameElement(place.name,place.namePositionX,place.namePositionY, mouseX, mouseY)      
            isInsideNameElement = insideNameElementAux[0]
            sizeFontWidth = insideNameElementAux[1]
            if (isInsidePlace){
                idPlace = place.id
            }
            else if (isInsideNameElement) {
                nameElement = place.name
            }
        }
 

    }

    else if (simulation) {
        netSimulationMove(mouseX, mouseY)
    }

    //console.log(arrayArcs)
    
})

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    mouseMoveX = mouseX;
    mouseMoveY = mouseY;

    if (!simulation) {
    
        if (drawArc == true && startingPositionArc.length > 0 && endPositionArc.length == 0) {
            startX = startingPositionArc[0][0]
            startY = startingPositionArc[0][1]
            finalX = mouseX
            finalY = mouseY
        }
        else {
            startX = null
            startY = null
            finalX = null
            finalY = null
        }

        for (var place of arrayPlaces) {
            // isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            // insideNameElementAux = insideNameElement(place.name,place.namePositionX,place.namePositionY, mouseX, mouseY)      
            // isInsideNameElement = insideNameElementAux[0]
            // sizeFontWidth = insideNameElementAux[1]
            
            if (isPress && idPlace == place.id) {
                place.posX = mouseX;
                place.posY = mouseY;
            }

            else if (isPress && nameElement == place.name) {
                    place.namePositionX = mouseX - sizeFontWidth/2
                    place.namePositionY = mouseY + sizeFontName/2
            }
            for (var arc of place.connections) {
                adjustedPositionArc(arc, mouseX, mouseY, place.posX, place.posY, "place")
            }
        }

        for (var transition of arrayTransitions) {
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)    
            insideNameElementAux = insideNameElement(transition.name,transition.namePositionX,transition.namePositionY, mouseX, mouseY)   
            isInsideNameElement = insideNameElementAux[0]
            sizeFontWidth = insideNameElementAux[1]   
            if (isInsideTransition && isPress) {
                transition.posX = mouseX - transitionWidth / 2;
                transition.posY = mouseY - transitionHeigth / 2;
            }
            else if (isInsideNameElement && isPress) {
                transition.namePositionX = mouseX - sizeFontWidth/2
                transition.namePositionY = mouseY + sizeFontName/2
            }
            for (var arc of transition.connections) {
                adjustedPositionArc(arc, mouseX, mouseY, transition.posX, transition.posY, "transition")
            }
        }
            
        for (var arc of arrayArcs) {
            nIntermediatePoints = arc.intermediatePoints.length
            for (var i = 0; i < nIntermediatePoints; i++) {
                isInsidePointArc = insideArc(mouseX, mouseY, arc.intermediatePoints[i][0], arc.intermediatePoints[i][1])
                if (isInsidePointArc && isPress) {
                    arc.intermediatePoints[i][0] = mouseX
                    arc.intermediatePoints[i][1] = mouseY      
                }
            }  
        }
        
        buttonPress == 1 ? isMovingPlace = true : isMovingPlace = false
        buttonPress == 2 ? isMovingTransition = true : isMovingTransition = false

    }

    cursorStyle(mouseMoveX, mouseMoveY);
})

canvas.addEventListener('mouseup', (event) => {
    if (event.button == 0) {
        isPress = false
        idPlace = null
        nameElement = null
    }
})

loop();