function loop() {
    window.requestAnimationFrame(loop, canvas);
    render();
    buttonsColors()
}

canvas.addEventListener('mousedown', (event) => {
    //Obtendo posição do ponteiro do mouse
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (buttonPress == 1) {
        objPlace = {
            id: nPlaces,
            name: `place ${nPlaces + 1}`,
            namePositionX: mouseX - 20,
            namePositionY: mouseY - 35,
            posX: mouseX,
            posY: mouseY,
            connections: [],
            nTokens: nTokens
        }
        arrayPlaces.push(objPlace);
        nPlaces += 1;
        buttonPress = 0

        
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
        buttonPress = 0
    }

    if (buttonPress == 3) {
        if (startingPositionArc.length > 0 && endPositionArc.length == 0) {
            intermediatePoints.push([mouseX, mouseY])
        }
        for (var place of arrayPlaces) {
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            //console.log(isInsidePlace)
            posEdge = adjustedPositionArcPlace(mouseX, mouseY, place.posX, place.posY)
            posEdge.push(place.name)
            if (isInsidePlace && startingPositionArc.length == 0) {
                startingPositionArc.push(posEdge)
                place.connections.push(`Start Arc ${nArcs + 1}`)
                start = place.name
                typeElement = "place"
            }
            else if (isInsidePlace && typeElement == "transition") {
                endPositionArc.push(posEdge)
                place.connections.push(`Finish Arc ${nArcs + 1}`)
                end = place.name
                drawArc = false
                typeElement = null
            }
        }
        for (var transition of arrayTransitions) {
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)
            mouseXY = [mouseX, mouseY, transition.name]
            if (isInsideTransition && startingPositionArc.length == 0) {
                startingPositionArc.push(mouseXY)
                transition.connections.push(`Start Arc ${nArcs + 1}`)
                start = transition.name
                typeElement = "transition"
            }
            else if (isInsideTransition && typeElement == "place") {
                endPositionArc.push(mouseXY)
                transition.connections.push(`Finish Arc ${nArcs + 1}`)
                end = transition.name
                drawArc = false
                typeElement = null
            }
        }
        if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
            intermediatePoints.pop() 
            objArc = {
                id: nArcs,
                name: `Arc ${nArcs + 1}`,
                startingPositionArc: startingPositionArc,
                endPositionArc: endPositionArc,
                start: start,
                end: end,
                intermediatePoints: intermediatePoints,

                trianglePoints: [],
                weight: 1
            }
            arrayArcs.push(objArc);
            nArcs += 1;
            startingPositionArc = [];
            endPositionArc = [];
            intermediatePoints = [];
            start = null;
            end = null;
            if (drawArc == false) {
                buttonPress = 0
            }
        }   
    }

    // 1. Verifico se está encima do elemento lugar 
    // 2. Verifico se existe algum arco associado a esse lugar
    // 3. Verifico, caso exista um arco associado, a qual transição está associada também
    // 4. Caso 2 e 3 se confirmem, excluo a informação na transição de que aquele arco está associado
    // 5. Caso 2 se confirme, excluo o arco
    // 6. Caso 1 se confirme, excluo o lugar

    if (buttonPress == 4) {

        for (var place of arrayPlaces) {
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            if (isInsidePlace) {
                if (place.connections.length > 0) {
                    for (var connectionPlace of place.connections) {                       
                        arcNamePlace = `${connectionPlace.substring(connectionPlace.indexOf(' ') + 1)}`                                              
                        for (var transition of arrayTransitions) {
                            for (var connectionTransition of transition.connections) {
                                arcNameTransition = `${connectionTransition.substring(connectionTransition.indexOf(' ') + 1)}`   
                                if (arcNameTransition == arcNamePlace) {
                                    indexConection = transition.connections.indexOf(connectionTransition)
                                    transition.connections.splice(indexConection, 1)
                                }
                            }
                        }
                        for (var arc of arrayArcs) {
                            index = arrayArcs.indexOf(arc)
                            if (arcNamePlace == arc.name) {
                                arrayArcs.splice(index, 1)
                            }
                        }
                    } 
                }
                index = arrayPlaces.indexOf(place)
                arrayPlaces.splice(index, 1) // remove do arrayPlaces o elemento na posição index
                buttonPress = 0
            }
        }
      
        for (var transition of arrayTransitions) {
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)
            if (isInsideTransition) {
                if (transition.connections.length > 0) {
                    for (var connectionTransition of transition.connections) {                       
                        arcNameTransition = `${connectionTransition.substring(connectionTransition.indexOf(' ') + 1)}`                                              
                        for (var place of arrayPlaces) {
                            for (var connectionPlace of place.connections) {
                                arcNamePlace = `${connectionPlace.substring(connectionPlace.indexOf(' ') + 1)}`   
                                if (arcNamePlace == arcNameTransition) {
                                    indexConection = place.connections.indexOf(connectionPlace)
                                    place.connections.splice(indexConection, 1)
                                }
                            }
                        }
                        for (var arc of arrayArcs) {
                            index = arrayArcs.indexOf(arc)
                            if (arcNameTransition == arc.name) {
                                arrayArcs.splice(index, 1)
                            }
                        }
                    } 
                }
                index = arrayTransitions.indexOf(transition) 
                arrayTransitions.splice(index, 1) 
                buttonPress = 0
            }
        }
    }

    

    if (buttonPress == 5) {

        

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