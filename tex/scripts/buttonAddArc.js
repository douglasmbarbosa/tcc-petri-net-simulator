function buttonAddArc() {
    cleanVariables();
    if (buttonPress != 3) {
        buttonPress = 3;
        drawArc = true;
    } 
    arcType = "normal";
}