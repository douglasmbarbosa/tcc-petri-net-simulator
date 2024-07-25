canvas.addEventListener('dblclick', (e) => {
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
    
    var currentText = null

    arrayPlaces.forEach(place => {
        isInsidePlace = insidePlace(mouseX,mouseY,place.posX,place.posY)
        insideNameElementAux = insideNameElement(place.name,place.namePositionX,place.namePositionY, mouseX, mouseY)      
        isInsideNameElement = insideNameElementAux[0]
        index = arrayPlaces.indexOf(place)
        if (isInsidePlace) {
            currentText = {text: place.nTokens, x: place.posX, y: place.posY, type: "placeToken", index: index}
        }
        
        else if (isInsideNameElement){
            currentText = {text: place.name, x: place.namePositionX, y: place.namePositionY, type: "placeDescription", index: index}
        }
        
    });  
    arrayTransitions.forEach(transition => {
        insideNameElementAux = insideNameElement(transition.name,transition.namePositionX,transition.namePositionY, mouseX, mouseY)   
        isInsideNameElement = insideNameElementAux[0]
        index = arrayTransitions.indexOf(transition)
        if (isInsideNameElement){
            currentText = {text: transition.name, x: transition.namePositionX, y: transition.namePositionY, type: "transitionDescription", index: index}
        }
    });
    arrayArcs.forEach(arc => {
        insideWeightElementAux = insideNameElement(arc.weight,arc.weightPos.x,arc.weightPos.y, mouseMoveX, mouseMoveY)   
        isInsideWeightElement = insideWeightElementAux[0]
        index = arrayArcs.indexOf(arc)
        if (isInsideWeightElement) {
            currentText = {text: arc.weight, x: arc.weightPos.x, y: arc.weightPos.y, type: "arcWeight", index: index}
        }
    })
    
    
    
    if (currentText) {
        editBox.style.left = (currentText.x + rect.left) + 'px';
        editBox.style.top = (currentText.y + rect.top - parseInt(ctx.font, 10)) + 'px';
        editBox.style.display = 'block';
        editBox.value = currentText.text;
        editBox.focus();
    }
    
    editBox.addEventListener('blur', () => {
    
        if (currentText) {
            
            if (currentText.type == "placeToken" && Number.isInteger(Number(editBox.value))) {
                arrayPlaces[currentText.index].nTokens = Number(editBox.value)
                currentText = null
            }
            
            else if (currentText.type == "placeDescription") {
                arrayPlaces[currentText.index].name = editBox.value
                currentText = null
            }
            
            else if (currentText.type == "transitionDescription") {
                arrayTransitions[currentText.index].name = editBox.value
                currentText = null
            }
            
            else if (currentText.type == "arcWeight" && Number.isInteger(Number(editBox.value))) {
                arrayArcs[currentText.index].weight = Number(editBox.value)
                currentText = null
            }
        
            editBox.style.display = 'none';
                
        }
    });
    
    
        
});
   

    
    