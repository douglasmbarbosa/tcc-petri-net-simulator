function loop() {
    window.requestAnimationFrame(loop, canvas);
    render();
    buttonColors();
    if (simulation) {
        netSimulationEnables()
    }
}