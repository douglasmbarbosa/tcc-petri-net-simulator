function cursorStyle(mouseMoveX, mouseMoveY) {

    

    for (var place of arrayPlaces) {
        isInsidePlace = insidePlace(mouseMoveX, mouseMoveY, place.posX, place.posY) 
        if (isInsidePlace) {
            canvas.style.cursor = 'pointer'
        }
        else {
            canvas.style.cursor = 'default'
        }
    }

    
    

}