function saveVariables() {
    variables = {
        places: arrayPlaces,
        transitions: arrayTransitions,
        arcs: arrayArcs,
        buttonPress: buttonPress,
        nPlaces: nPlaces,
        nTransitions: nTransitions,
        nArcs: nArcs,   
    };
    return variables;
}

function loadVariables(data) {
    arrayPlaces = data.places;
    arrayTransitions = data.transitions;
    arrayArcs = data.arcs;
    buttonPress = data.buttonPress
    nPlaces = data.nPlaces;
    nTransitions = data.nTransitions;
    nArcs = data.nArcs;
}

function saveJSON() {
    
    variables = saveVariables();
    const dataStr = JSON.stringify(variables);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function loadJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);       
        loadVariables(data);              
        };
    reader.readAsText(file);
}

document.getElementById("buttonSaveNet").addEventListener("click", saveJSON);
document.getElementById("buttonLoadNet").addEventListener("click", () => {document.getElementById("fileInput").click();});
document.getElementById("fileInput").addEventListener("change", loadJSON);

window.addEventListener('beforeunload', () => {
    variables = JSON.stringify(saveVariables());
    localStorage.setItem('data', variables);
});

window.addEventListener('load', () => {    
    data = JSON.parse(localStorage.getItem('data'));   
    if (data) {
        loadVariables(data);
    }   
});