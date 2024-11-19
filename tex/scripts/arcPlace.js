for (var place of arrayPlaces) {
    isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY);
    posEdge = adjustedPositionArcPlace(mouseX, mouseY, place.posX, place.posY);
    posEdge.push(place.id);
    if (isInsidePlace && startingPositionArc.length == 0) {
        startingPositionArc.push(posEdge);
        place.connections.push(`Start Arc ${nArcs + 1}`);
        start = place.id;
        typeElement = "place";
    }
    else if (isInsidePlace && typeElement == "transition") {
        endPositionArc.push(posEdge);
        place.connections.push(`Finish Arc ${nArcs + 1}`);
        end = place.id;
        drawArc = false;
        typeElement = null;
    }
}

