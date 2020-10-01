var fm = new FluidMeter();
fm.init({
    targetContainer: document.getElementById("fluid-meter"),
    fillPercentage: 0,
    options: {
        fontSize: "70px",
        fontFamily: "Arial",
        fontFillStyle: "white",
        drawShadow: true,
        drawText: true,
        drawPercentageSign: true,
        drawBubbles: true,
        size: 300,
        borderWidth: 25,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
            fillStyle: "#3c42d0",
            angularSpeed: 100,
            maxAmplitude: 12,
            frequency: 30,
            horizontalSpeed: -150
        },
        backgroundFluidLayer: {
            fillStyle: "#72c2ff",
            angularSpeed: 100,
            maxAmplitude: 9,
            frequency: 30,
            horizontalSpeed: 150
        }
    }
});

var fm2 = new FluidMeter();
fm2.init({
    targetContainer: document.getElementById("fluid-meter2"),
    fillPercentage: 0,
    options: {
        fontSize: "70px",
        fontFamily: "Arial",
        fontFillStyle: "white",
        drawShadow: true,
        drawText: true,
        drawPercentageSign: true,
        drawBubbles: true,
        size: 300,
        borderWidth: 25,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
            fillStyle: "#09d00c",
            angularSpeed: 100,
            maxAmplitude: 12,
            frequency: 30,
            horizontalSpeed: -150
        },
        backgroundFluidLayer: {
            fillStyle: "#1dff00",
            angularSpeed: 100,
            maxAmplitude: 9,
            frequency: 30,
            horizontalSpeed: 150
        }
    }
});
var fm3 = new FluidMeter();
fm3.init({
    targetContainer: document.getElementById("fluid-meter3"),
    fillPercentage: 0,
    options: {
        fontSize: "70px",
        fontFamily: "Arial",
        fontFillStyle: "white",
        drawShadow: true,
        drawText: true,
        drawPercentageSign: true,
        drawBubbles: true,
        size: 300,
        borderWidth: 25,
        backgroundColor: "#e2e2e2",
        foregroundColor: "#fafafa",
        foregroundFluidLayer: {
            fillStyle: "#d01100",
            angularSpeed: 100,
            maxAmplitude: 12,
            frequency: 30,
            horizontalSpeed: -150
        },
        backgroundFluidLayer: {
            fillStyle: "#ff665f",
            angularSpeed: 100,
            maxAmplitude: 9,
            frequency: 30,
            horizontalSpeed: 150
        }
    }
});