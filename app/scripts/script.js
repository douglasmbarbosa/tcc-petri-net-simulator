function criar_nova_rede() {
    localStorage.clear();
    array_lugares = [];
}

function adicionar_lugar(){
    
    // Criação do objeto lugar na posição n
    
    dados = localStorage.getItem("array_lugares")
    if (dados == null) {
        n = 0;
        array_lugares.push(`P_${n}`)
        localStorage.setItem("array_lugares",array_lugares)
        console.log(array_lugares)
    }
    else {
        array_lugares = dados.split(",")
        n = array_lugares.length
        array_lugares.push(`P_${n}`)
        localStorage.setItem("array_lugares",array_lugares)
        console.log(array_lugares)
    }
    
    // Criação do elemento gráfico lugar
    
    var div_lugar = document.createElement("div");
    div_lugar.id = `P_${n}`;
    div_lugar.className = "lugar";
    var divAtual = document.getElementById("lugares");
    document.body.insertBefore(div_lugar, divAtual);
    
}

function adicionar_transicao(clique){
    console.log("Transição Adicionada")
}

function adicionar_arco(clique){
    console.log("Arco Adicionado")
}

function adicionar_marcacao(clique){
    console.log("Marcação Adicionada")
}

function simular_rede(clique){
    console.log("Simulando Rede")
}
 

// Variáreis

var array_lugares = [];




