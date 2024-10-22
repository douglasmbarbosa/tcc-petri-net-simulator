function buttonAddPlace() {
    cleanVariables()
    if (buttonPress != 1) {
        buttonPress = 1   
    }
    else {
        buttonPress = 0    
    }    
}

function buttonAddTransition() {
    cleanVariables()
    if (buttonPress != 2) {
        buttonPress = 2   
    }
    else {
        buttonPress = 0   
    }  
}

function buttonAddArc() {
    cleanVariables()
    if (buttonPress != 3) {
        buttonPress = 3
        drawArc = true
    } 
    arcType = "normal"  
}

function buttonAddInhArc() {
    cleanVariables()
    if (buttonPress != 4) {
        buttonPress = 4
        drawArc = true
    }
    arcType = "inhibitor"   
}

function buttonDeleteElement() {
    cleanVariables()
    if (buttonPress != 5) {
        //cleanVariables()
        buttonPress = 5      
    }
    else {
        buttonPress = 0   
    }
}

function buttonNetSimulation() {
    cleanVariables()
    if (!simulation) {
        buttonPress = 6
        simulation = true
    }

    else if (simulation) {
        buttonPress = 0
        simulation = false
    }
}



