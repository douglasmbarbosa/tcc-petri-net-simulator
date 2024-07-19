var colorOn = "red"
var colorOff = "lightblue"
var buttons = ["buttonAddPlace", "buttonAddTransition", "buttonAddArc", "buttonDeleteElement", "buttonDeleteNet", "buttonNetSimulation", "buttonSaveNet"]

function buttonColors(){
  
    for (var button of buttons) {
        index = buttons.indexOf(button)
        buttonPress == (index + 1) ? document.getElementById(button).style.backgroundColor = colorOn : document.getElementById(button).style.backgroundColor = colorOff
    }

}
