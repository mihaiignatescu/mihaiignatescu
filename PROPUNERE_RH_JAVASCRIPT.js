// Importing necessary math functions
const math = Math;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('C1_evaluateButton').addEventListener('click', function() {
        // Fetch and convert input values to numbers
        // let HA = parseFloat(document.getElementById('HA').value);
        let LxA = parseFloat(document.getElementById('LxA').value);
        let LyA = parseFloat(document.getElementById('LyA').value);
        // let HB = parseFloat(document.getElementById('HB').value);
        // let DR = parseFloat(document.getElementById('DR').value);

        // Check for NaN inputs and alert if any
        if ([LxA, LyA].some(isNaN)) {
           alert('Please enter valid numbers for LxA and LyA');
           return; // Exit the function early
        }

        // Update the webpage to show the results of the analysis
        // let resultText = `Analysis results for the given inputs: HA=${HA}, LxA=${LxA}, LyA=${LyA}, HB=${HB}, DR=${DR}`;

        // FUNCTIE CRITERIU 1
        C1_evaluateBuildingCriteria(LxA, LyA);

    });

    document.getElementById('C2_evaluateButton').addEventListener('click', function() {
        // let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);

        // Check if either HA or HB is NaN (not a number) and alert if so
        if (isNaN(HB)) {
            alert('Please enter valid numbers for HB');
            return; // Exit the function early if invalid input
        }

        C2_evaluateBuildingCriteria(HB); // Call the function with the collected values
    });

    document.getElementById('C3_evaluateButton').addEventListener('click', function() {
        // let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Check if any of the inputs are NaN and alert if so
        if (isNaN(HB) || isNaN(DR)) {
            alert('Please enter valid numbers for HB and DR');
            return; // Exit the function early if invalid input
        }

        C3_evaluateBuildingCriteria(HB, DR); // Call the function with the collected values
    });

    document.getElementById('C4_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Validate inputs
        if (isNaN(HA) || isNaN(HB)) {
            alert('Please enter valid numbers for HA and HB');
            return; // Exit early if any input is not a valid number
        }

        C4_evaluateBuildingCriteria(HA, HB); // Execute the evaluation with collected values
    });

    document.getElementById('C5_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let LxA = parseFloat(document.getElementById('LxA').value);
        let LyA = parseFloat(document.getElementById('LyA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Validate inputs
        if (isNaN(HB) || isNaN(DR) || isNaN(LxA) || isNaN(LyA)) {
            alert('Please enter valid numbers for LxA, LyA, HB and DR.');
            return; // Exit early if any input is not a valid number
        }

        evaluate_HA(LxA, LyA, HB, DR); // Execute the evaluation with collected values
    });
});


// CRITERIUL 1
function C1_evaluateBuildingCriteria(LxA, LyA) {
    document.getElementById('C1_outputArea').innerHTML = "";
    let min_HA, max_HA;
    if (LxA >= LyA) {
        min_HA = Math.round(3 * LxA);
        max_HA = Math.round(12 * LxA);
    } else {
        min_HA = Math.round(3 * LyA);
        max_HA = Math.round(12 * LyA);
    }
    // Find the output area by its ID and update its content
    document.getElementById('C1_outputArea').innerHTML = `Inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.`;
}


// CRITERIUL 2
function C2_evaluateBuildingCriteria(HB) {
    document.getElementById('C2_outputArea').innerHTML = "";
    let min_HA = Math.round(3 / 2 * HB);
    let max_HA = Math.round(3 * HB);
    // Update the content of the output area
    document.getElementById('C2_outputArea').innerHTML += `Inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.<br>`;
}


// CRITERIUL 3
function C3_evaluateBuildingCriteria(HB, DR) {
    // Clear the output area at the beginning of the function
    document.getElementById('C3_outputArea').innerHTML = "";

    let output = "";

    let min_HA_60g = Math.round((4 * HB / 3) + DR * Math.sqrt(3));
    let max_HA_60g = Math.round(3 * HB);
    output += `Pentru O=60gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_60g} si ${max_HA_60g} unitati.<br>`;

    let min_HA_45g = Math.round((4 * HB / 3) + DR);
    let max_HA_45g = Math.round(3 * HB);
    output += `Pentru O=45gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_45g} si ${max_HA_45g} unitati.<br>`;

    let min_HA_30g = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
    let max_HA_30g = Math.round(3 * HB);
    output += `Pentru O=30gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_30g} si ${max_HA_30g} unitati.<br>`;

    let min_HA = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
    let max_HA = Math.round((4 * HB / 3) + DR * Math.sqrt(3));
    // Correctly append the final part instead of redeclaring `output`
    output += `Inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.<br>`;

    document.getElementById('C3_outputArea').innerHTML = output;
}


// CRITERIUL 4
function C4_evaluateBuildingCriteria(HA, HB) {
    document.getElementById('C4_outputArea').innerHTML = ""; // Clear previous content

    let min_DR = Math.round((HA - (4 * HB / 3)) / Math.sqrt(3));
    let max_DR = Math.round((3 * HA * Math.sqrt(3)) - (4 * HB * Math.sqrt(3)));
    
    // Update the content of the output area
    document.getElementById('C4_outputArea').innerHTML = `Criteriul 4 - distanța de percepție vizuală:<br>Distanta dintre reperul de inaltime propus si cladirea existenta trebuie sa fie cuprinsa intre ${min_DR} si ${max_DR} unitati.`;
}


// CRITERIUL 5
function evaluate_HA(LxA, LyA, HB, DR) {
    document.getElementById('C4_outputArea').innerHTML = ""; // Clear previous content
    let ranges = [];
    let output = '';

    if (LxA !== undefined && LyA !== undefined) {
        let min_HA_c1 = Math.round(3 * Math.max(LxA, LyA));
        let max_HA_c1 = Math.round(12 * Math.max(LxA, LyA));
        ranges.push([min_HA_c1, max_HA_c1]);
    }

    if (HB !== undefined) {
        let min_HA_c2 = Math.round(3 / 2 * HB);
        let max_HA_c2 = Math.round(3 * HB);
        ranges.push([min_HA_c2, max_HA_c2]);
    }

    if (HB !== undefined && DR !== undefined) {
        let min_HA_c3 = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
        let max_HA_c3 = Math.round((4 * HB / 3) + DR * Math.sqrt(3));
        ranges.push([min_HA_c3, max_HA_c3]);
    }

    if (ranges.length > 0) {
        let common_min = Math.max(...ranges.map(r => r[0]));
        let common_max = Math.min(...ranges.map(r => r[1]));
        if (common_min <= common_max) {
            output += (`Intervalul comun pentru inaltimea reperului propus este intre ${common_min} si ${common_max} unitati.`);
        } else {
            output += ("Nu exista un interval comun pentru valorile inaltimii reperului propus");
        }
    } else {
        output += ("Nu se poate calcula intervalul comun pentru valorile introduse");
    }
    document.getElementById('C5_outputArea').innerHTML = output;
}

evaluate_HA(LxA, LyA, HB, DR);