function evaluateInterval() {
    const LyA = parseFloat(document.getElementById('LyA').value);
    const LxB = parseFloat(document.getElementById('LxB').value);
    
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
    let output = '';

    if (!isNaN(LyA) && isNaN(LxB)) {
        // Calculate LxA based on LyA
        let minLxA = Math.ceil(LyA / 6);   // LxA >= LyA / 6
        let maxLxA = Math.ceil(LyA);       // LxA <= LyA

        output += `Lățimea pieței trebuie să fie cuprinsă între: <br>${minLxA} și ${maxLxA} metri`;
    } else if (!isNaN(LxB) && isNaN(LyA)) {
        // Calculate LxA based on LxB
        let minLxA = Math.ceil((3 * LxB) / 2);  // LxA >= (3 * LxB) / 2
        let maxLxA = Math.ceil(3 * LxB);        // LxA <= 3 * LxB

        output += `Lățimea pieței trebuie să fie cuprinsă între: <br>${minLxA} și ${maxLxA} metri`;
    } else {
        output += "Te rog să introduci valori doar într-un câmp";
    }

    document.getElementById('outputArea').innerHTML = output;
}
