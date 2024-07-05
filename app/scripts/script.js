function loop() {
    window.requestAnimationFrame(loop, canvas);
    render();
}

canvas.addEventListener('mousedown', (event) => {
    //Obtendo posição do ponteiro do mouse
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (buttonPress == 1) {
        objPlace = {
            id: nPlaces,
            Name: `place ${nPlaces + 1}`,
            namePositionX: mouseX - 20,
            namePositionY: mouseY - 35,
            posX: mouseX,
            posY: mouseY,
            connections: [],
            nTokens: nTokens
        }
        arrayPlaces.push(objPlace);
        nPlaces += 1;
    }

    if (buttonPress == 2) {
        objTransition = {
            id: nTransitions,
            name: `transition ${nTransitions + 1}`,
            namePositionX: mouseX - 20,
            namePositionY: mouseY - 35,
            posX: mouseX - transitionWidth / 2,
            posY: mouseY - transitionHeigth / 2,
            connections: [],
            isEnabled: isEnabled
        }
        arrayTransitions.push(objTransition);
        nTransitions += 1;
    }

    if (buttonPress == 3) {
        drawArc = true
        if (startingPositionArc.length > 0 && endPositionArc.length == 0) {
            intermediatePoints.push([mouseX, mouseY])
        }
        for (var place of arrayPlaces) {
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            posEdge = adjustedPositionArcPlace(mouseX, mouseY, place.posX, place.posY)
            posEdge.push(place.Name)
            if (isInsidePlace && startingPositionArc.length == 0) {
                startingPositionArc.push(posEdge)
                place.connections.push(`Start Arc ${nArcs + 1}`)
                typeElement = "place"
            }
            else if (isInsidePlace && typeElement == "transition") {
                endPositionArc.push(posEdge)
                place.connections.push(`Finish Arc ${nArcs + 1}`)
                drawArc = false
                typeElement = null
            }
        }
        for (var transition of arrayTransitions) {
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)
            mouseXY = [mouseX, mouseY, transition.Name]
            if (isInsideTransition && startingPositionArc.length == 0) {
                startingPositionArc.push(mouseXY)
                transition.connections.push(`Start Arc ${nArcs + 1}`)
                typeElement = "transition"
            }
            else if (isInsideTransition && typeElement == "place") {
                endPositionArc.push(mouseXY)
                transition.connections.push(`Finish Arc ${nArcs + 1}`)
                drawArc = false
                typeElement = null
            }
        }
        if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
            intermediatePoints.pop() 
            objArc = {
                id: nArcs,
                Name: `Arc ${nArcs + 1}`,
                startingPositionArc: startingPositionArc,
                endPositionArc: endPositionArc,
                intermediatePoints: intermediatePoints,
                trianglePoints: [],
                weight: 1
            }
            arrayArcs.push(objArc);
            nArcs += 1;
            startingPositionArc = [];
            endPositionArc = [];
            intermediatePoints = []
        }

        //console.log(arrayArcs)
    }
    if (drawArc == false) {
        buttonPress = 0
    }
    //Verifica se o botão pressionado foi o esquerdo  
    if (event.button == 0) {
        isPress = true
    }
})

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    for (var place of arrayPlaces) {
        isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
        insideNameElementAux = insideNameElement(place.name,place.namePositionX,place.namePositionY, mouseX, mouseY)      
        isInsideNameElement = insideNameElementAux[0]
        sizeFontWidth = insideNameElementAux[1]
        canvas.style.cursor = isPress ? 'grabbing' : 'default'
        if (isInsidePlace && isPress) {
            place.posX = mouseX;
            place.posY = mouseY;
        }
        else if (isInsideNameElement && isPress) {
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
        canvas.style.cursor = isPress ? 'grabbing' : 'default'
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
        idArc = arc.id
        nIntermediatePoints = arc.intermediatePoints.length
        for (var i = 0; i < nIntermediatePoints; i++) {
            isInsidePointArc = insideArc(mouseX, mouseY, arc.intermediatePoints[i][0], arc.intermediatePoints[i][1])
            if (isInsidePointArc && isPress) {
                arc.intermediatePoints[i][0] = mouseX
                arc.intermediatePoints[i][1] = mouseY      
            }
        }
    }
     
})

canvas.addEventListener('mouseup', (event) => {
    if (event.button == 0) {
        isPress = false
    }
})

loop();