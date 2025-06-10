function insideTransition(mouseX, mouseY, transitionX, transitionY) {
    var a = (mouseX >= transitionX) && (mouseX <= transitionX + transitionWidth) && (mouseY >= transitionY) && (mouseY <= transitionY + transitionHeigth)
    return a;
}

 for (var transition of arrayTransitions) {
    isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)    
    if (isPress && isInsideTransition) {
        transition.posX = mouseX - transitionWidth / 2;
        transition.posY = mouseY - transitionHeigth / 2;
    }
}