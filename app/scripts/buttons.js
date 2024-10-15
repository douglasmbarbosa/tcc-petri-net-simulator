function buttonAddPlace() {
    if (buttonPress != 1) {
        buttonPress = 1   
    }
    else {
        buttonPress = 0    
    }    
}

function buttonAddTransition() {
    if (buttonPress != 2) {
        buttonPress = 2   
    }
    else {
        buttonPress = 0   
    }  
}

function buttonAddArc() {
    if (buttonPress != 3) {
        buttonPress = 3
        drawArc = true
    } 
    arcType = "normal"  
}

function buttonAddInhArc() {
    if (buttonPress != 3) {
        buttonPress = 3
        drawArc = true
    }
    arcType = "inhibitor"   
}

function buttonDeleteElement() {
    if (buttonPress != 4) {
        buttonPress = 4      
    }
    else {
        buttonPress = 0   
    }
}

function buttonNetSimulation() {
    if (!simulation) {
        buttonPress = 5
        simulation = true
    }

    else if (simulation) {
        buttonPress = 0
        simulation = false
    }
}



