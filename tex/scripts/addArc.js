
if (startingPositionArc.length > 0 && endPositionArc.length > 0) {
    intermediatePoints.pop();
    objArc = {
        id: `Arc ${nArcs + 1}`,
        name: `A${nArcs + 1}`,
        type: arcType,
        startingPositionArc: startingPositionArc,
        endPositionArc: endPositionArc,
        start: start,
        end: end,
        intermediatePoints: intermediatePoints,
        isEnable: false,
        weight: 1,
        weightPos: {x: null, y: null}
    }
    arrayArcs.push(objArc);
    nArcs += 1;
    startingPositionArc = [];
    endPositionArc = [];
    intermediatePoints = [];
    start = null;
    end = null;
}