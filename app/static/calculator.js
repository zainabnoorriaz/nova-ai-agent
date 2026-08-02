function openCalculator() {
    document.getElementById("calc-modal").classList.add("active");
}

function closeCalculator() {
    document.getElementById("calc-modal").classList.remove("active");
}

function calcInput(val) {
    document.getElementById("calc-display").value += val;
}

function calcClear() {
    document.getElementById("calc-display").value = "";
}

function calcEquals() {
    const display = document.getElementById("calc-display");
    try {
        display.value = Function('"use strict"; return (' + display.value + ')')();
    } catch (e) {
        display.value = "Error";
    }
}