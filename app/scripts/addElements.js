var canvas = document.getElementById('petri-net-canvas');
var ctx = canvas.getContext('2d');

var buttonPress = 0; 
var arrayPlaces = []; 
var arrayTransitions = [];
var tokens = []
var nPlaces = 0;
var nTransitions = 0;
var nTokens = 0;
var isMoving = false;
var isEnabled = false;

canvas.addEventListener('mousedown', (event) => {
    //console.log(buttonPress)
    //Obtendo posição do ponteiro do mouse
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    //Criando o elemento 
    ctx.beginPath();
    ctx.lineWidth=4

    //Dando Nome aos elementos
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    if (buttonPress == 1) {
        objPlace = {
            id: nPlaces,
            Name: `Place ${nPlaces + 1}`,
            posX: mouseX,
            posY: mouseY,
            conectadoHa: tokens,
            nTokens: nTokens,
            isMoving: isMoving
        }
        arrayPlaces.push(objPlace)
        ctx.arc(mouseX,mouseY,25,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText(arrayPlaces[nPlaces].Name, mouseX, mouseY - 35);
        nPlaces += 1;
    }
    if (buttonPress == 2) {
        objTransition = {
            id: nTransitions,
            Name: `Transition ${nTransitions + 1}`,
            posX: mouseX,
            posY: mouseY,
            conectadoHa: tokens,
            isEnabled: isEnabled,
            isMoving: isMoving
        }
        arrayTransitions.push(objTransition);      
        ctx.rect(mouseX,mouseY,20,50) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.fillText(arrayTransitions[nTransitions].Name, mouseX, mouseY - 20);
        nTransitions += 1;
        console.log(arrayTransitions)
    }
    ctx.stroke()
    buttonPress = 0   
})

function addPlace() {
    buttonPress = 1
    //console.log(buttonPress)
}

function addTransition() {
    buttonPress = 2
    console.log(buttonPress)
}

function addToken() {
    buttonPress = 3
    console.log(buttonPress)
}

