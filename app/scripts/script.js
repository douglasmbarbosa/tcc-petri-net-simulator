var arrayLugares = []

arcos = []

objLugar = {
    id: 1,
    Nome: "Lugar 1",
    posX: [20,30],
    posY:25,
    conectadoHa: arcos,
    nMarcacoes: 3,
    estaMovendo: false
}

objLugar2 = {
    id: 2,
    Nome: "Lugar 2",
    posX: [87,30],
    posY:15,
    conectadoHa: arcos,
    nMarcacoes: 6,
    estaMovendo: false
}

arrayLugares.push(objLugar)

//console.log(arrayLugares)


arrayLugares.push(objLugar2)

for (var i of arrayLugares) {
    console.log(i.posX[1])
    //ctx.arc(arrayPlaces[i].posX,arrayPlaces[i].posY,25,0,2*Math.PI) // Argumentos (x,y,raio,angulo inicial,angulo final)
    //ctx.fillText(arrayPlaces[nPlaces].Name, mouseX, mouseY - 35);
}

//console.log(arrayLugares[0].posX)

nLugares = 2

//console.log()