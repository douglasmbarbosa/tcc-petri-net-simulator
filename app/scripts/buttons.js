function buttonAddPlace() {
    buttonPress = 1
}

function buttonAddTransition() {
    buttonPress = 2
}

function buttonAddArc() {
    buttonPress = 3
    drawArc = true
}

function buttonDeleteElement() {
    buttonPress = 4
}

function buttonDeleteNet() {
    
    console.log(arrayTransitions)
    buttonPress = 5;
   
}

function buttonNetSimulation() {
    buttonPress = 6

    if (!simulation) {
        simulation = true
    }

    else if (simulation) {
        simulation = false
    }
   
}

function buttonSaveNet() {
    buttonPress = 7
    console.log(arrayArcs)
}

function buttonLoadNet() {
    buttonPress = 8
    
}


