var canvas = document.getElementById('petri-net-canvas')
var ctx = canvas.getContext('2d');
var buttonPress = 0

canvas.addEventListener('mousedown', (event) => {
    console.log(buttonPress)
    //Obtendo posição do ponteiro do mouse
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    //Criando o elemento 
    ctx.beginPath();
    ctx.lineWidth=4
    console.log(mouseX, mouseY)

    //Dando nome aos elementos
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    if (buttonPress == 1) {
        ctx.arc(mouseX,mouseY,25,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
        ctx.fillText('Lugar 1', mouseX, mouseY - 35);
    }
    if (buttonPress == 2) {
        ctx.rect(mouseX,mouseY,20,50) // Argumentos (x,y,largura,altura)
        ctx.fill();
        ctx.fillText('Transição 1', mouseX, mouseY - 20);
    }
    ctx.stroke()
    buttonPress = 0
})

function adicionarLugar() {
    buttonPress = 1
    console.log(buttonPress)
}

function adicionarTransicao() {
    buttonPress = 2
    console.log(buttonPress)
}

function adicionarArco() {
    buttonPress = 3
    console.log(buttonPress)
}

