function addTransition(mouseX, mouseY) {
    objTransition = {
        id: `transition ${nTransitions + 1}`,
        name: `T${nTransitions + 1}`,
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