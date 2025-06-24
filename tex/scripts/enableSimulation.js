function buttonNetSimulation() {
    cleanVariables()
    if (!simulation) {
        buttonPress = 6
        simulation = true
    }
    else if (simulation) {
        buttonPress = 0
        simulation = false
    }
}
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (simulation) {
        netSimulationMove(mouseX, mouseY)
    }
})