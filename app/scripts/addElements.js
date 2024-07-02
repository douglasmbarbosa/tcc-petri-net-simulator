var canvas = document.getElementById('petri-net-canvas');
var ctx = canvas.getContext('2d');
var buttonPress = 0; 
var arrayPlaces = []; 
var arrayTransitions = [];
var arrayArcs = [];
var arcs = [];
var startingPositionArc= []
var endPositionArc = []
var intermediatePoints = []
var nPlaces = 0;
var nTransitions = 0;
var nTokens = 0;
var isMoving = false;
var isEnabled = false;
var isPress = false
var drawArc = false
selectFirtsPoint = false
var isInsidePlace = false
var isInsideTransition = false
const radius = 25;
const transitionHeigth = 50
const transitionWidth = 20

function loop(){
    window.requestAnimationFrame(loop,canvas);
    update();
    render();
}

function update(){

    
}

function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height); // Comando para limpar a área do canvas
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.linewidth = 4;
    for (var place of arrayPlaces) {  
        ctx.beginPath();
        ctx.arc(place.posX,place.posY,radius,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText(place.Name, place.posX, place.posY - 35);
        ctx.closePath();
        ctx.stroke();
    }
    for (var transition of arrayTransitions) {  
        ctx.beginPath();
        ctx.rect(transition.posX,transition.posY,transitionWidth,transitionHeigth) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.fillText(transition.Name, transition.posX, transition.posY - 20);
        ctx.closePath();
    }    
    
    for (var arc of arrayArcs) {
        ctx.beginPath();
        ctx.moveTo(arc.startingPositionArc[0][0], arc.startingPositionArc[0][1]);
        ctx.lineTo(arc.endPositionArc[0][0], arc.endPositionArc[0][1]);
        ctx.closePath();
        ctx.stroke();
    }
    
    
    
}

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

function drawArc(){



}


function addPlace() {
    buttonPress = 1
    //console.log(buttonPress)
}

function addTransition() {
    buttonPress = 2
    //console.log(buttonPress)
}

function addArc() {
    buttonPress = 3
    //(buttonPress)
}

canvas.addEventListener('mousedown', (event) => {
    //Obtendo posição do ponteiro do mouse
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top; 
    if (buttonPress == 1) {
        objPlace = {
            id: nPlaces,
            Name: `place ${nPlaces + 1}`,
            posX: mouseX,
            posY: mouseY,
            connections: arcs,
            nTokens: nTokens,
        }
        arrayPlaces.push(objPlace);
        //console.log(arrayPlaces)
        nPlaces += 1;
    }
    if (buttonPress == 2) {
        objTransition = {
            id: nTransitions,
            Name: `transition ${nTransitions + 1}`,
            posX: mouseX,
            posY: mouseY,
            connections: arcs,
            isEnabled: isEnabled,
        }
        arrayTransitions.push(objTransition);      
        nTransitions += 1;
    }   
    
    if (buttonPress == 3 ){
        
        drawArc= true
        
        for (var place of arrayPlaces){
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX,place.posY)
            mouseXY = [mouseX,mouseY]
            if(isInsidePlace && startingPositionArc.length == 0) {
                startingPositionArc.push(mouseXY)
            }
            else if(isInsidePlace){
                endPositionArc.push(mouseXY)
                drawArc = false
            }   
        }
        
        for (var transition of arrayTransitions){
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX,transition.posY)
            mouseXY = [mouseX,mouseY]
            if(isInsideTransition && startingPositionArc.length == 0) {
                startingPositionArc.push(mouseXY) 
            }
            else if (isInsideTransition) {
                endPositionArc.push(mouseXY)
                drawArc = false
            }
        }
        if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
            objArc = {
                startingPositionArc: startingPositionArc, 
                endPositionArc: endPositionArc,
                //intermediatePoints: intermediatePoints,
                weight: 1
            } 
            arrayArcs.push(objArc); 
            startingPositionArc = [];
            endPositionArc = [];
        }
        console.log(arrayArcs)
        
        
    }
    
    
    if (drawArc == false){
        buttonPress = 0 
    }
      
    //Verifica se o botão pressionado foi o esquerdo  
    if (event.button == 0) {
        isPress = true
    }    
})

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;  
     for (var place of arrayPlaces){
        isInsidePlace = insidePlace(mouseX, mouseY, place.posX,place.posY)
        
        canvas.style.cursor = isPress ? 'grabbing' : 'default'
        
        if (isInsidePlace && isPress) {
            place.posX = mouseX;
            place.posY = mouseY;
            //console.log(place.Name)
        }
    } 
    for (var transition of arrayTransitions){
        isInsideTransition = insideTransition(mouseX, mouseY, transition.posX,transition.posY)
        canvas.style.cursor = isPress ? 'grabbing' : 'default'
        if (isInsideTransition && isPress) {
            transition.posX = mouseX - transitionWidth/2;
            transition.posY = mouseY - transitionHeigth/2;
            //console.log(transition.Name)
        }   
    }
    
})

canvas.addEventListener('mouseup', (event) => {
    if (event.button == 0) {
        isPress = false
    }
})

loop();