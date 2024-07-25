function addPlace(mouseX, mouseY) {
    objPlace = {
        id: nPlaces,
        name: `place ${nPlaces + 1}`,
        namePositionX: mouseX - 20,
        namePositionY: mouseY - 35,
        posX: mouseX,
        posY: mouseY,
        connections: [],
        nTokens: 0
    }
    arrayPlaces.push(objPlace);
    nPlaces += 1;
}

function addTransition(mouseX, mouseY) {
    objTransition = {
        id: nTransitions,
        name: `transition ${nTransitions + 1}`,
        namePositionX: mouseX - 20,
        namePositionY: mouseY - 35,
        posX: mouseX - transitionWidth / 2,
        posY: mouseY - transitionHeigth / 2,
        connections: [],
        isEnabled: false
    }
    arrayTransitions.push(objTransition);
    nTransitions += 1;
}

function addArc(mouseX, mouseY) {
    if (startingPositionArc.length > 0 && endPositionArc.length == 0) {
        intermediatePoints.push([mouseX, mouseY]);
    }
    for (var place of arrayPlaces) {
        isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY);
        posEdge = adjustedPositionArcPlace(mouseX, mouseY, place.posX, place.posY);
        posEdge.push(place.name);
        if (isInsidePlace && startingPositionArc.length == 0) {
            startingPositionArc.push(posEdge);
            place.connections.push(`Start Arc ${nArcs + 1}`);
            start = place.name;
            typeElement = "place";
        }
        else if (isInsidePlace && typeElement == "transition") {
            endPositionArc.push(posEdge);
            place.connections.push(`Finish Arc ${nArcs + 1}`);
            end = place.name;
            drawArc = false;
            typeElement = null;
        }
    }
    for (var transition of arrayTransitions) {
        isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY);
        mouseXY = [mouseX, mouseY, transition.name];
        if (isInsideTransition && startingPositionArc.length == 0) {
            startingPositionArc.push(mouseXY);
            transition.connections.push(`Start Arc ${nArcs + 1}`);
            start = transition.name;
            typeElement = "transition";
        }
        else if (isInsideTransition && typeElement == "place") {
            endPositionArc.push(mouseXY);
            transition.connections.push(`Finish Arc ${nArcs + 1}`);
            end = transition.name;
            drawArc = false;
            typeElement = null;
        }
    }
    if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
        intermediatePoints.pop();
        objArc = {
            id: nArcs,
            name: `Arc ${nArcs + 1}`,
            startingPositionArc: startingPositionArc,
            endPositionArc: endPositionArc,
            start: start,
            end: end,
            intermediatePoints: intermediatePoints,
            weight: 1,
            weightPos: {x: null, y: null}
        }
        arrayArcs.push(objArc);
        nArcs += 1;
        startingPositionArc = [];
        endPositionArc = [];
        intermediatePoints = [];
        start = null;
        end = null;
    }
}


