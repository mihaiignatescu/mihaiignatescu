function evaluateInterval() {
    const HR = parseFloat(document.getElementById('HR').value);
    const LS = parseFloat(document.getElementById('LS').value);
    
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
    let output = '';

    if (!isNaN(HR) && isNaN(LS)) {
        // Calculate LS based on HR
        let minLS = Math.ceil(HR);       // LS >= HR
        let maxLS = Math.ceil(2 * HR);   // LS <= 2 * HR

        output += `Lățimea spațiului liber trebuie să fie cuprinsă între: <br>${minLS} și ${maxLS} metri`;
    } else if (!isNaN(LS) && isNaN(HR)) {
        // Calculate HA based on LS
        let minHA = Math.ceil(LS / 4);              // HA >= LS / 4
        let maxHA = Math.ceil(LS / Math.sqrt(3));   // HA <= LS / sqrt(3)

        output += `Înălțimea frontului propus trebuie trebuie să fie cuprinsă între: <br>${minHA} și ${maxHA} metri`;
    } else {
        output += "Te rog să introduci valori doar într-un câmp";
    }

    document.getElementById('outputArea').innerHTML = output;
}
