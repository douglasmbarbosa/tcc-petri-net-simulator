for (var transition of arrayTransitions) {
    isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY);
    mouseXY = [mouseX, mouseY, transition.id];
    if (isInsideTransition && startingPositionArc.length == 0 && arcType == "normal") {
        startingPositionArc.push(mouseXY);
        transition.connections.push(`Start Arc ${nArcs + 1}`);
        start = transition.id;
        typeElement = "transition";
    }
    else if (isInsideTransition && typeElement == "place") {
        endPositionArc.push(mouseXY);
        transition.connections.push(`Finish Arc ${nArcs + 1}`);
        end = transition.id;
        drawArc = false;
        typeElement = null;
    }
}