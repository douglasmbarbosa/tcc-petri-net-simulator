for (var transition of arrayTransitions) {  
    ctx.beginPath();
    ctx.rect(transition.posX,transition.posY,transitionWidth,transitionHeigth)
    if (transition.isEnable && simulation) {
        ctx.fillStyle = 'red'
    }
    else {
        ctx.fillStyle = 'black'   
    }
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'black' 
    ctx.fillText(transition.name, transition.namePositionX, transition.namePositionY); 
}  