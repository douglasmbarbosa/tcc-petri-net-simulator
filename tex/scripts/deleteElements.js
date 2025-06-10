canvas.addEventListener('mousedown', (event) => {

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    if (buttonPress == 5) {
        deleteElements(mouseX, mouseY)
    }

    function deleteElements(mouseX, mouseY) { 

        for (var place of arrayPlaces) {
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
            if (isInsidePlace) {
                if (place.connections.length > 0) {
                    for (var connectionPlace of place.connections) {                       
                        arcIdPlace = `${connectionPlace.substring(connectionPlace.indexOf(' ') + 1)}`                                              
                        for (var transition of arrayTransitions) {
                            for (var connectionTransition of transition.connections) {
                                arcIdTransition = `${connectionTransition.substring(connectionTransition.indexOf(' ') + 1)}`   
                                if (arcIdTransition == arcIdPlace) {
                                    indexConection = transition.connections.indexOf(connectionTransition)
                                    transition.connections.splice(indexConection, 1)
                                }
                            }
                        }
                        for (var arc of arrayArcs) {
                            index = arrayArcs.indexOf(arc)
                            if (arcIdPlace == arc.id) {
                                arrayArcs.splice(index, 1)
                            }
                        }
                    } 
                }
                index = arrayPlaces.indexOf(place)
                arrayPlaces.splice(index, 1)
                buttonPress = 0
            }
        }
    }
    
})