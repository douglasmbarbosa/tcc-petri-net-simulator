function netSimulationEnables() {
    for (var transition of arrayTransitions) {
        var arrayIsEnable = [] 
        for (var connection of transition.connections) {
            var point = connection.substring(0, connection.indexOf(' '))
            if (point == "Finish") {nu
                var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`
                for (var arc of arrayArcs) {
                    if (arc.id == arcId) {              
                        weightArc = arc.weight
                        placeStart = arc.startingPositionArc[0][2]  
                        for (var place of arrayPlaces) {
                            if (place.id == placeStart) {
                               if (arc.type == "normal") { 
                                    if (place.nTokens >= arc.weight) {
                                            arc.isEnable = true        
                                    }
                                    else {
                                            arc.isEnable = false
                                    }
                                }
                                else if (arc.type == "inhibitor") {
                                    if (place.nTokens < arc.weight) {
                                        arc.isEnable = true        
                                    }
                                    else {
                                        arc.isEnable = false
                                    }
                                }
                               arrayIsEnable.push(arc.isEnable)
                            }
                        }

                    }

                }   
            }
        }
        allTrue = arrayIsEnable.every(value => value === true);
        if (allTrue) {
            transition.isEnable = true
        }
        else {
            transition.isEnable = false
        }
    }
}