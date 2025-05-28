function insidePlace(mouseX,mouseY,placeX,placeY) {
    var a = mouseX - placeX;
    var b = mouseY - placeY;
    var c = (Math.pow(a,2) + Math.pow(b,2) <= Math.pow(radius,2))
    return c; 
}
for (var place of arrayPlaces) {
    isInsidePlace = insidePlace(mouseX, mouseY, place.posX, place.posY)
    if (isInsidePlace && isPress){
        place.posX = mouseX;
        place.posY = mouseY;
    }
}
