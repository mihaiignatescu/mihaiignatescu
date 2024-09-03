function evaluateInterval() {
    const HR = parseFloat(document.getElementById('HR').value);
    const LS = parseFloat(document.getElementById('LS').value);
    
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
    let output = '';

    if (!isNaN(HR) && isNaN(LS)) {
        // Calculate LS based on HR
        let minLS = Math.ceil(HR / 2);   // LS >= HR / 2
        let maxLS = Math.ceil(HR);       // LS <= HR

        output += `Lățimea spațiului liber trebuie să fie cuprinsă între: <br>${minLS} și ${maxLS} metri`;
    } else if (!isNaN(LS) && isNaN(HR)) {
        // Calculate HA based on LS
        let minHA = Math.ceil(LS * Math.sqrt(3));   // HA >= LS * sqrt(3)
        let maxHA = Math.ceil(4 * LS);              // HA <= 4 * LS

        output += `Înălțimea frontului propus trebuie trebuie să fie cuprinsă între: <br>${minHA} și ${maxHA} metri`;
    } else {
        output += "Te rog să introduci valori doar într-un câmp";
    }

    document.getElementById('outputArea').innerHTML = output;
}
