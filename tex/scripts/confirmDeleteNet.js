document.getElementById('buttonDeleteNet').addEventListener('click', function() {
    var confirmation = confirm("Do you really want to delete the petri net?");
    if (confirmation) {
        deleteNet();
    } else {
        buttonPress = 0;      
    }
});