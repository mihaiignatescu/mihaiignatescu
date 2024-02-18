// Importing necessary math functions
const math = Math;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('C1_evaluateButton').addEventListener('click', function() {
        // Fetch and convert input values to numbers
        let HA = parseFloat(document.getElementById('HA').value);
        let LxA = parseFloat(document.getElementById('LxA').value);
        let LyA = parseFloat(document.getElementById('LyA').value);
        // let HB = parseFloat(document.getElementById('HB').value);
        // let DR = parseFloat(document.getElementById('DR').value);

        // Check for NaN inputs and alert if any
        if ([HA, LxA, LyA].some(isNaN)) {
           alert('Please enter valid numbers for all fields.');
           return; // Exit the function early
        }

        // Update the webpage to show the results of the analysis
        // let resultText = `Analysis results for the given inputs: HA=${HA}, LxA=${LxA}, LyA=${LyA}, HB=${HB}, DR=${DR}`;

        // FUNCTIE CRITERIU 1
        C1_evaluateBuildingCriteria(LxA, LyA, HA);

    });

    document.getElementById('C2_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);

        // Check if either HA or HB is NaN (not a number) and alert if so
        if (isNaN(HA) || isNaN(HB)) {
            alert('Please enter valid numbers for HA and HB.');
            return; // Exit the function early if invalid input
        }

        C2_evaluateBuildingCriteria(HA, HB); // Call the function with the collected values
    });

    document.getElementById('C3_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Check if any of the inputs are NaN and alert if so
        if (isNaN(HA) || isNaN(HB) || isNaN(DR)) {
            alert('Please enter valid numbers for HA, HB, and DR.');
            return; // Exit the function early if invalid input
        }

        C3_evaluateBuildingCriteria(HA, HB, DR); // Call the function with the collected values
    });
    
    document.getElementById('C4_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Validate inputs
        if (isNaN(HA) || isNaN(HB) || isNaN(DR)) {
            alert('Please enter valid numbers for HA, HB, and DR.');
            return; // Exit early if any input is not a valid number
        }

        C4_evaluateBuildingCriteria(HA, HB, DR); // Execute the evaluation with collected values
    });

    document.getElementById('C5_evaluateButton').addEventListener('click', function() {
        let HA = parseFloat(document.getElementById('HA').value);
        let LxA = parseFloat(document.getElementById('LxA').value);
        let LyA = parseFloat(document.getElementById('LyA').value);
        let HB = parseFloat(document.getElementById('HB').value);
        let DR = parseFloat(document.getElementById('DR').value);

        // Validate inputs
        if (isNaN(HA) || isNaN(HB) || isNaN(DR) || isNaN(LxA) || isNaN(LyA)) {
            alert('Please enter valid numbers for HA, HB, and DR.');
            return; // Exit early if any input is not a valid number
        }

        evaluate_HA(HA, LxA, LyA, HB, DR); // Execute the evaluation with collected values
    });
});


// CRITERIUL 1
function C1_evaluateBuildingCriteria(LxA, LyA, HA) {
    document.getElementById('C1_outputArea').innerHTML = "";
    let output = ""; // Use <br> for line breaks in HTML

    if (LxA >= LyA) {
        if (3 * LxA < HA && HA < 12 * LxA) {
            output += "Cladirea analizata are forma supla, caracteristica unui reper de inaltime.";
        } else {
            output += "Cladirea analizata nu respecta proportiile unui reper de inaltime.";
            output += `<br>Inaltimea cladirii trebuie sa fie de minim ${3 * LxA} unitati.`;
        }
    } else {
        if (3 * LyA < HA && HA < 12 * LyA) {
            output += "Cladirea analizata are forma supla, caracteristica unui reper de inaltime.";
        } else {
            output += "Cladirea analizata nu are forma caracteristica unui reper de inaltime.";
            output += `<br>Inaltimea cladirii trebuie sa fie de minim ${3 * LyA} unitati.`;
        }
    }

    // Update the outputArea div on the webpage
    const outputArea = document.getElementById('C1_outputArea');
    outputArea.innerHTML = output;
}


// CRITERIUL 2
function C2_evaluateBuildingCriteria(HA, HB) {
    document.getElementById('C2_outputArea').innerHTML = "";
    let output = ""; // Use <br> for line breaks in HTML

    if (HA < HB) {
        output += "Inaltimea cladirii analizate este mai mica decat inaltimea cladirii din vecinatate.";
        output += `<br>Inaltimea cladirii analizate trebuie sa aibe minim ${HB} unitati.`;
    } else if (HA > 3 * HB) {
        output += "Inaltimea cladirii analizate este prea mare raportata la inaltimea cladirii din vecinatate.";
        output += `<br>Inaltimea cladirii analizate trebuie sa aibe maxim ${3 * HB} unitati.`;
    } else {
        output += "Inaltimea cladirii analizate este potrivita in relatie cu cladirea din vecinatate.";
    }

    // Update the outputArea div on the webpage
    const outputArea = document.getElementById('C2_outputArea');
    outputArea.innerHTML = output;
}


// CRITERIUL 3
function C3_evaluateBuildingCriteria(HA, HB, DR) {
    document.getElementById('C3_outputArea').innerHTML = "";
    let output = ""; // Start with the criterion description

    // Calculate conditions
    let condition_A_min = Math.round(4 * HB / 3 + DR * Math.sqrt(3));
    let condition_B_min = Math.round(4 * HB / 3 + DR);
    let condition_C_min = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));

    let condition_max = Math.round(3 * HB); // General condition for being smaller than 3 * HB

    // Check conditions
    if (HA < condition_max && HA > condition_A_min) {
        output += "Cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de inaltime in relatie cu cladirea vecine.";
    } else if (HA < condition_max && HA > condition_B_min) {
        output += "Cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de inaltime in relatie cu cladirea vecine.";
    } else if (HA < condition_max && HA > condition_C_min) {
        output += "Cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de inaltime in relatie cu cladirea vecine.";
    } else {
        output += "Inaltimea cladirii analizate nu se incadreaza in intervalul impus de inaltimea cladirilor vecine.";
        let suggested_min = Math.max(condition_A_min, condition_B_min, condition_C_min);
        output += `<br>Inaltimea cladrii analizate trebuie sa fie cuprinsa intre ${suggested_min} si ${condition_max} unitati.`;
    }

    // Update the outputArea div on the webpage
    const outputArea = document.getElementById('C3_outputArea');
    outputArea.innerHTML = output;
}


// CRITERIUL 4
function C4_evaluateBuildingCriteria(HA, HB, DR) {
    document.getElementById('C4_outputArea').innerHTML = "";
    let output = ""; // Criterion description

    // Calculate the maximum and minimum values for DR
    let max_DR = Math.round((3 * HA * Math.sqrt(3)) - (4 * HB * Math.sqrt(3)));
    let min_DR = Math.round((HA - (4 * HB / 3)) / Math.sqrt(3));

    // Check if DR falls within the range
    if (min_DR < DR && DR < max_DR) {
        output += "Distanta dintre cladirea analizata si cladirea vecina este optima.";
    } else {
        output += `Distanta dintre cladirea analizata si cladirea vecina nu respecta criteriul.`;
        output += `<br>Distanta dintre cladirea analizata si cladirea vecina trebuie sa fie cuprinsa intre ${min_DR} si ${max_DR} unitati.`;
    }

    // Update the outputArea div on the webpage
    const outputArea = document.getElementById('C4_outputArea');
    outputArea.innerHTML = output;
}


// CRITERIUL 5.1
function criterion_1(HA, LxA, LyA) {
    let min_HA, max_HA;
    if (LxA >= LyA) {
        min_HA = Math.round(3 * LxA);
        max_HA = Math.round(12 * LxA);
    } else {
        min_HA = Math.round(3 * LyA);
        max_HA = Math.round(12 * LyA);
    }
    return [HA > min_HA && HA < max_HA, [min_HA, max_HA]];
}

function criterion_2(HA, HB) {
    return [HA > HB && HA < 3 * HB, [HB, 3 * HB]];
}

function criterion_3(HA, HB, DR) {
    let condition_A_min = Math.round(4 * HB / 3 + DR * Math.sqrt(3));
    let condition_B_min = Math.round(4 * HB / 3 + DR);
    let condition_C_min = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
    let condition_max = Math.round(3 * HB);
    let min_HA = Math.max(condition_A_min, condition_B_min, condition_C_min);
    return [HA > min_HA && HA < condition_max, [min_HA, condition_max]];
}

// CRITERIUL 5.2
function evaluate_HA(HA, LxA, LyA, HB, DR) {
    document.getElementById('C5_outputArea').innerHTML = "";
    let min_ranges = [];
    let max_ranges = [];
    let output = '';
    let [crit1_pass, crit1_range] = criterion_1(HA, LxA, LyA);
    let [crit2_pass, crit2_range] = criterion_2(HA, HB);
    let [crit3_pass, crit3_range] = criterion_3(HA, HB, DR);
    
    if (!crit1_pass) {
        min_ranges.push(crit1_range[0]);
        max_ranges.push(crit1_range[1]);
    }
    if (!crit2_pass) {
        min_ranges.push(crit2_range[0]);
        max_ranges.push(crit2_range[1]);
    }
    if (!crit3_pass) {
        min_ranges.push(crit3_range[0]);
        max_ranges.push(crit3_range[1]);
    }
    
    if (!crit1_pass || !crit2_pass || !crit3_pass) {
        let suggested_min = Math.min(...max_ranges);
        let suggested_max = Math.max(...min_ranges);
        output += "cladirea analizata nu este reper de inaltime.<br>";
        output += `inaltimea cladirii analizate trebuie sa fie cuprinsa intre ${suggested_min} si ${suggested_max} unitati pentru a fi considerata reper de inaltime.<br>`
        // console.log("cladirea analizata nu este reper de inaltime.");
        // console.log(`inaltimea cladirii analizate trebuie sa fie cuprinsa intre ${suggested_min} si ${suggested_max} unitati pentru a fi considerata reper de inaltime.`);
    } else {
        output += "cladirea analizata este considerata reper de inaltime.<br>"
        // console.log("cladirea analizata este considerata reper de inaltime.");
    }
    // Update the outputArea div on the webpage
    const outputArea = document.getElementById('C5_outputArea');
    outputArea.innerHTML = output;
}