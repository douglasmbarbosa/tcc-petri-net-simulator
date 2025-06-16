function saveVariables() {
    variables = {
        places: arrayPlaces,
        transitions: arrayTransitions,
        arcs: arrayArcs,
        nPlaces: nPlaces,
        nTransitions: nTransitions,
        nArcs: nArcs,   
    };
    return variables;
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

document.getElementById("buttonSaveNet").addEventListener("click", saveJSON);
document.getElementById("buttonLoadNet").addEventListener("click", () => {document.getElementById("fileInput").click();});