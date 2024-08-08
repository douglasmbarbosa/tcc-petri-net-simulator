var colorOn = "yellow"
var colorOff = "lightblue"
var buttons = ["buttonAddPlace", "buttonAddTransition", "buttonAddArc", 
    "buttonDeleteElement", "buttonNetSimulation"]

function buttonColors(){
  
    for (var button of buttons) {
        index = buttons.indexOf(button)
        buttonPress == (index + 1) ? document.getElementById(button).style.backgroundColor = colorOn : document.getElementById(button).style.backgroundColor = colorOff
    }

    document.getElementById('buttonSaveNet').style.backgroundColor = 'grey'
    document.getElementById('buttonLoadNet').style.backgroundColor = 'grey'
    document.getElementById('buttonDeleteNet').style.backgroundColor = 'grey'
   
}
