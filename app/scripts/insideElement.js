function insidePlace(mouseX,mouseY,placeX,placeY) {
    var a = mouseX - placeX;
    var b = mouseY - placeY;
    var c = (Math.pow(a,2) + Math.pow(b,2) <= Math.pow(radius,2))
    return c; 
}

function insideTransition(mouseX, mouseY, transitionX, transitionY) {
    var a = (mouseX >= transitionX) && (mouseX <= transitionX + transitionWidth) && (mouseY >= transitionY) && (mouseY <= transitionY + transitionHeigth)
    return a;
}

function insideNameElement(name, namePositionX, namePositionY, mouseX, mouseY) {

    var textMetrics = ctx.measureText(name);
    var textWidth = textMetrics.width;
    //console.log(textWidth)
    var textHeight = sizeFontName; 

    a = (mouseX >= namePositionX) && (mouseX <= namePositionX + textWidth) && (mouseY >= namePositionY - textHeight) && (mouseY <= namePositionY)

    b = [a, textWidth]

    //console.log(b)

    return b
    

}