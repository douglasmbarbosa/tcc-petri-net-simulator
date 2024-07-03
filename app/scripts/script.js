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
var nArcs = 0;
var nTokens = 0;
var isMoving = false;
var isEnabled = false;
var isPress = false
var drawArc = false
var selectFirtsPoint = false
var isInsidePlace = false
var isInsideTransition = false
var typeElement = null
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

function adjustedPositionArc(arc, mouseX, mouseY) {

    

    var point = arc.substring(0, arc.indexOf(' '))
    var arcName = `${arc.substring(arc.indexOf(' ') + 1)}`
    var idArc = arcName.substring(arcName.indexOf(' ') + 1) - 1

    if (point == "Start") {

        arcPosX = arrayArcs[idArc].startingPositionArc[0][0]
        arcPosY = arrayArcs[idArc].startingPositionArc[0][1]
        console.log(arcPosX, arcPosY)

        arrayArcs[idArc].startingPositionArc[0][0] = mouseX  //- (mouseX - arrayArcs[idArc].startingPositionArc[0][0])
        arrayArcs[idArc].startingPositionArc[0][1] = mouseY  //(mouseY - arrayArcs[idArc].startingPositionArc[0][1])

    }

    else if (point == "Finish") {

        console.log(arrayArcs[idArc].endPositionArc)
        arrayArcs[idArc].endPositionArc[0][0] = mouseX
        arrayArcs[idArc].endPositionArc[0][1] = mouseY


    }

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
            connections: [],
            nTokens: nTokens
        }
        arrayPlaces.push(objPlace);
        //console.log(arrayPlaces)
        nPlaces += 1;
    }

    if (buttonPress == 2) {
        objTransition = {
            id: nTransitions,
            Name: `transition ${nTransitions + 1}`,
            posX: mouseX - transitionWidth/2,
            posY: mouseY - transitionHeigth/2,
            connections: [],
            isEnabled: isEnabled
        }
        arrayTransitions.push(objTransition);      
        nTransitions += 1;
    }   
    
    if (buttonPress == 3 ){
        
        drawArc= true
        
        for (var place of arrayPlaces){
            isInsidePlace = insidePlace(mouseX, mouseY, place.posX,place.posY)

            const dx = mouseX - place.posX;
            const dy = mouseY - place.posY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const adjustedX = place.posX + (dx / distance) * radius;
            const adjustedY = place.posY + (dy / distance) * radius;

            posEdge = [adjustedX,adjustedY, place.Name]

            if(isInsidePlace && startingPositionArc.length == 0) {
                
                startingPositionArc.push(posEdge)
                place.connections.push(`Start Arc ${nArcs + 1}`)
                typeElement = "place"
            }
            else if(isInsidePlace && typeElement == "transition"){
                endPositionArc.push(posEdge)
                place.connections.push(`Finish Arc ${nArcs + 1}`)
                drawArc = false
                typeElement = null
            }   
        }
        
        for (var transition of arrayTransitions){
            isInsideTransition = insideTransition(mouseX, mouseY, transition.posX,transition.posY)

            mouseXY = [mouseX,mouseY,transition.Name]

            if(isInsideTransition && startingPositionArc.length == 0) {
                startingPositionArc.push(mouseXY)
                transition.connections.push(`Start Arc ${nArcs + 1}`)
                typeElement = "transition"
            }
            else if (isInsideTransition && typeElement == "place") {
                endPositionArc.push(mouseXY)
                transition.connections.push(`Finish Arc ${nArcs + 1}`)
                drawArc = false
                typeElement = null
            }
        }
        if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
            objArc = {
                id: nTransitions,
                Name: `Arc ${nArcs + 1}`,
                startingPositionArc: startingPositionArc, 
                endPositionArc: endPositionArc,
                intermediatePoints: intermediatePoints,
                weight: 1
            } 
            arrayArcs.push(objArc);
            nArcs += 1; 
            startingPositionArc = [];
            endPositionArc = [];
            // console.log(arrayArcs)
            // console.log(arrayPlaces)
            // console.log(arrayTransitions)
        }
        
        
        
        
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

            for (var arc of place.connections){
                adjustedPositionArc(arc, mouseX, mouseY)
            }

            



            //console.log(place.Name)
        }
    } 
    for (var transition of arrayTransitions){
        isInsideTransition = insideTransition(mouseX, mouseY, transition.posX,transition.posY)
        canvas.style.cursor = isPress ? 'grabbing' : 'default'
        if (isInsideTransition && isPress) {
            transition.posX = mouseX - transitionWidth/2;
            transition.posY = mouseY - transitionHeigth/2;

            for (var arc of transition.connections){
                adjustedPositionArc(arc, mouseX, mouseY)
            }

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