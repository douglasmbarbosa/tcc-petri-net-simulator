function deleteElements(mouseX, mouseY) { 

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


    for (var arc of arrayArcs) {
        index = arrayArcs.indexOf(arc)
        nIntermediatePoints = arc.intermediatePoints.length
        isInsideTriangleArc = insideTriangle(arc, mouseX, mouseY)       
        if (nIntermediatePoints > 0) {
            for (var i = 0; i < nIntermediatePoints; i++) {
                isInsidePointArc = insideArc(mouseX, mouseY, arc.intermediatePoints[i][0], arc.intermediatePoints[i][1])                
                if (isInsidePointArc) {                   
                    deleteArc(arc, index)
                }           
            }
        }
        if (isInsideTriangleArc) {
            deleteArc(arc, index)
        }
              
    }

}


function deleteArc(arc, index) {

    for (var place of arrayPlaces) {
        if (place.name == arc.start || place.name == arc.end) {
            for (var connectionPlace of place.connections) {
                arcNamePlace = `${connectionPlace.substring(connectionPlace.indexOf(' ') + 1)}`   
                if (arcNamePlace == arc.name) {
                    indexConection = place.connections.indexOf(connectionPlace)
                    place.connections.splice(indexConection, 1)
                }
            }
        }
    }

    for (var transition of arrayTransitions) {
        if (transition.name == arc.start || transition.name == arc.end) {
            for (var connectionTransition of transition.connections) {
                arcNameTransition = `${connectionTransition.substring(connectionTransition.indexOf(' ') + 1)}`   
                if (arcNameTransition == arc.name) {
                    indexConection = transition.connections.indexOf(connectionTransition)
                    transition.connections.splice(indexConection, 1)
                }
            }
        }
    }
    arrayArcs.splice(index, 1)
    buttonPress = 0
}

    // 1. Verifico se está encima do elemento lugar 
    // 2. Verifico se existe algum arco associado a esse lugar
    // 3. Verifico, caso exista um arco associado, a qual transição está associada também
    // 4. Caso 2 e 3 se confirmem, excluo a informação na transição de que aquele arco está associado
    // 5. Caso 2 se confirme, excluo o arco
    // 6. Caso 1 se confirme, excluo o lugar

function deleteNet() {
    arrayPlaces = [];
    arrayTransitions = [];
    arrayArcs = [];
    buttonPress = 0
    nPlaces = 0;
    nTransitions = 0;
    nArcs = 0;
    drawArc = false
}