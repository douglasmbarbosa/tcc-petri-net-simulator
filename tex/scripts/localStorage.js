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