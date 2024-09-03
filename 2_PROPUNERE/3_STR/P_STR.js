function evaluateInterval() {
    const LxA = parseFloat(document.getElementById('LxA').value);
    const LyB = parseFloat(document.getElementById('LyB').value);
    
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
    let output = '';

    if (!isNaN(LxA) && isNaN(LyB)) {
        // Calculate LyA based on LxA
        let minLyA = Math.ceil(6 * LxA);   // LyA >= 6 * LxA
        let maxLyA = Math.ceil(12 * LxA);  // LyA <= 12 * LxA

        output += `Lungimea străzii trebuie să fie cuprinsă între: <br>${minLyA} and ${maxLyA} metri`;
    } else if (!isNaN(LyB) && isNaN(LxA)) {
        // Calculate LyA based on LyB
        let minLyA = Math.ceil((3 * LyB) / 2);  // LyA >= (3 * LyB) / 2
        let maxLyA = Math.ceil(3 * LyB);        // LyA <= 3 * LyB

        output += `Lungimea străzii trebuie să fie cuprinsă între: <br>${minLyA} and ${maxLyA} metri`;
    } else {
        output += "Te rog să introduci valori doar într-un câmp";
    }

    document.getElementById('outputArea').innerHTML = output;
}
