function netSimulationMove(mouseX, mouseY) {
    for (var transition of arrayTransitions) {
        isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)
        if (isInsideTransition && transition.isEnable) {
            for (var connection of transition.connections) {
                var point = connection.substring(0, connection.indexOf(' '))
                if (point == "Start") {
                    var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`
                    for (var arc of arrayArcs) {
                        if (arc.id == arcId) { 
                            placeEnd = arc.endPositionArc[0][2]
                            for (var place of arrayPlaces) {
                                if (place.id == placeEnd && arc.type == "normal") {
                                    place.nTokens = place.nTokens + arc.weight
                                }
                            }
                        }
                    }
                }
            }
        }
        if (isInsideTransition && transition.isEnable) {
            for (var connection of transition.connections) {
                var point = connection.substring(0, connection.indexOf(' '))
                if (point == "Finish") {  
                    var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`
                    for (var arc of arrayArcs) {
                        if (arc.id == arcId) { 
                            placeStart = arc.startingPositionArc[0][2]
                            for (var place of arrayPlaces) {
                                if (place.id == placeStart && arc.type == "normal") {
                                    place.nTokens = place.nTokens - arc.weight
                                }
                            }
                        }   
                    }
                }
            }
        }
    }
}