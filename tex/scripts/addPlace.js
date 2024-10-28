function addPlace(mouseX, mouseY) {
    objPlace = {
        id: `place ${nPlaces + 1}`,
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
    // teste
}
