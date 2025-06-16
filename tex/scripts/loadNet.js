function loadVariables(data) {
    arrayPlaces = data.places;
    arrayTransitions = data.transitions;
    arrayArcs = data.arcs;
    nPlaces = data.nPlaces;
    nTransitions = data.nTransitions;
    nArcs = data.nArcs;
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

document.getElementById("fileInput").addEventListener("change", loadJSON);