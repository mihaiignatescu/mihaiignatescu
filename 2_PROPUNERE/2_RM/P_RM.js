function evaluateInterval() {
    const DO = parseFloat(document.getElementById('DO').value);
    const LxA = parseFloat(document.getElementById('LxA').value);
    
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
    let output = '';

    // Equation A: LyA >= sqrt(4 * (DO^2) * (7 - 4 * sqrt(3)) - LxA^2)
    let minLyA = Math.sqrt(4 * Math.pow(DO, 2) * (7 - 4 * Math.sqrt(3)) - Math.pow(LxA, 2));
    minLyA = Math.ceil(minLyA); // Round up the result

    // Equation B: LyA <= sqrt((4 * (DO^2) / 3) - LxA^2)
    let maxLyA = Math.sqrt((4 * Math.pow(DO, 2) / 3) - Math.pow(LxA, 2));
    maxLyA = Math.ceil(maxLyA); // Round up the result

    // Validate and find the common interval for LyA
    if (!isNaN(minLyA) && !isNaN(maxLyA) && minLyA <= maxLyA) {
        output += `Lățimea fațadei trebuie să fie cuprinsă între: <br>
        ${minLyA.toFixed(0)} și ${maxLyA.toFixed(0)} metri`;
    } else {
        output += "Nu poate fi generat intervalul, te rog să verifici valorile introduse";
    }

    document.getElementById('outputArea').innerHTML = output;
}
