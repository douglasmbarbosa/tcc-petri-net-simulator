// 1. Se a simulação estiver habilitada, todas as outras funções não relacionadas devem estar desabilitadas
    //1.1. Criar uma variável para indicar se a simulação está habilitada ou não
    //1.2. Colocar uma condição relacionada a simulação para executar ou não as outras funções
 
// 2. Verificar se existem transições fontes ou sumidouros
    // 2.1. FONTES: terão apenas arcos saindo (Alterar cor para vermelho caso verdadeiro)
    // 2.2. SUMIDOUROS: terão apenas arcos chegando

// 3. Verificar quais transições estão ativadas

    // 3.1. Verificar se o lugar que antecede a transição possui nTokens >= Peso do arco (Alterar cor para vermelho caso verdadeiro)

// 4. Se clicar em uma transição habilitada, executar a simulação

    // 4.1. Retirar do lugar os tokens necessários

function netSimulationEnables() {

    // verificar quais arcos estão chegando
    // verificar o lugar ao qual o arco vem
    // verificar se o ntokens do lugar é >= que o peso do arco
    // se sim, alterar a variável isEnable para true

    for (var transition of arrayTransitions) {

        var arrayIsEnable = [] 

        for (var connection of transition.connections) {

            var point = connection.substring(0, connection.indexOf(' '))

            if (point == "Finish") {

                var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`

                for (var arc of arrayArcs) {
                    if (arc.id == arcId) {
                        
                        weightArc = arc.weight
                        placeStart = arc.startingPositionArc[0][2]
                        
                        for (var place of arrayPlaces) {
                            if (place.id == placeStart) {
                               if (place.nTokens >= arc.weight) {
                                    arc.isEnable = true
                                            
                               }
                               else {
                                    arc.isEnable = false
                               }
                               arrayIsEnable.push(arc.isEnable)
                            }
                        }

                    }

                }   
            }
        }

        allTrue = arrayIsEnable.every(value => value === true);

        if (allTrue) {
            transition.isEnable = true
        }
        else {
            transition.isEnable = false
        }

    }
}

function netSimulationMove(mouseX, mouseY) {

    for (var transition of arrayTransitions) {


        isInsideTransition = insideTransition(mouseX, mouseY, transition.posX, transition.posY)
        
        if (isInsideTransition && transition.isEnable) {

            for (var connection of transition.connections) {

                var point = connection.substring(0, connection.indexOf(' '))
    
                if (point == "Start") {

                    var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`
                    for (var arc of arrayArcs) {
                        if (arc.id == arcId) {
                            
                            placeEnd = arc.endPositionArc[0][2]
                            for (var place of arrayPlaces) {
                                if (place.id == placeEnd) {
                                    place.nTokens = place.nTokens + arc.weight
                                }
                            }
                        }
                    }
                
                }
            
            
            
            }

        }


        if (isInsideTransition && transition.isEnable) {
           


            for (var connection of transition.connections) {

                var point = connection.substring(0, connection.indexOf(' '))
    
                if (point == "Finish") {  
                    var arcId = `${connection.substring(connection.indexOf(' ') + 1)}`
                    for (var arc of arrayArcs) {
                        if (arc.id == arcId) {
                            
                            placeStart = arc.startingPositionArc[0][2]
                            
                            for (var place of arrayPlaces) {
                                if (place.id == placeStart) {
                                    place.nTokens = place.nTokens - arc.weight
                                }
                            }
                        }   
                    }
                }
            }
        }

    }

}

