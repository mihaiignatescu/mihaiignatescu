// MODEL MATEMATIC PENTRU ANALIZA PARAMETRILOR - REPERUL DE INALTIME
const msg0 = "MODEL MATEMATIC PENTRU ANALIZA PARAMETRILOR - REPERUL DE INALTIME";
console.log(msg0);


// CRITERIUL 1
const msg1 = "Criteriul 1 - dimensiuni preliminare:";
console.log(msg1);

// Comparatie LxA, LyA
if (LxA >= LyA) {
    // Verificare daca HA respecta conditiile, cand LxA > LyA
    if (3 * LxA < HA && HA < 12 * LxA) {
        console.log("cladirea analizata are forma supla, caracteristica unui reper de inaltime.");
    } else {
        console.log("cladirea analizata nu respecta proportiile unui reper de inaltime.");
        console.log(`inaltimea cladirii trebuie sa fie de minim ${3 * LxA} unitati.`);
    }
} else {
    // Verificare daca HA respecta conditiile, cand LxA < LyA
    if (3 * LyA < HA && HA < 12 * LyA) {
        console.log("cladirea analizata are forma supla, caracteristica unui reper de inaltime.");
    } else {
        console.log("cladirea analizata nu are forma caracteristica unui reper de inaltime.");
        console.log(`inaltimea cladirii trebuie sa fie de minim ${3 * LyA} unitati.`);
    }
}


// CRITERIUL 2
const msg2 = "Criteriul 2 - parametri de baza:";
console.log(msg2);

// Check if HA is smaller than HB
if (HA < HB) {
    console.log("inaltimea cladirii analizate este mai mica decat inaltimea cladirii din vecinatate.");
    console.log(`inaltimea cladirii analizate trebuie sa aibe minim ${HB} unitati.`);
} else if (HA > 3 * HB) {
    console.log("inaltimea cladirii analizate este prea mare raportata la inaltimea cladirii din vecinatate.");
    console.log(`inaltimea cladirii analizate trebuie sa aibe maxim ${3 * HB} unitati.`);
} else {
    console.log("inaltimea cladirii analizate este potrivita in relatie cu caldirea din vecinatate.");
}


// CRITERIUL 3
const msg3 = "Criteriul 3 - parametri relativi:";
console.log(msg3);


// Calculate conditions
let condition_A_min = Math.round(4 * HB / 3 + DR * Math.sqrt(3));
let condition_B_min = Math.round(4 * HB / 3 + DR);
let condition_C_min = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));

// General condition for being smaller than 3 * HB
let condition_max = Math.round(3 * HB);

// Check conditions
if (HA < condition_max && HA > condition_A_min) {
    console.log("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.");
} else if (HA < condition_max && HA > condition_B_min) {
    console.log("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.");
} else if (HA < condition_max && HA > condition_C_min) {
    console.log("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.");
} else {
    console.log("inaltimea cladirii analizate nu se incadreaza in intervalul impus de inaltimea cladirilor vecine.");
    let suggested_min = Math.max(condition_A_min, condition_B_min, condition_C_min);
    console.log(`inaltimea cladrii analizate trebuie sa fie cuprinsa intre ${suggested_min} si ${condition_max} unitati.`);
}


// CRITERIUL 4
const msg4 = "Criteriul 4 - distanța de percepție vizuală:";
console.log(msg4);


// Calculate the maximum and minimum values for DR
let max_DR = Math.round((3 * HA * Math.sqrt(3)) - (4 * HB * Math.sqrt(3)));
let min_DR = Math.round((HA - (4 * HB / 3)) / Math.sqrt(3));

// Check if DR falls within the range
if (min_DR < DR && DR < max_DR) {
    console.log("distanta dintre cladirea analizata si cladirea vecina este optima.");
} else {
    console.log(`distanta dintre cladirea analizata si cladirea vecina nu respecta criteriul.`);
    console.log(`distanta dintre cladirea analizata si cladirea vecina trebuie sa fie cuprinsa intre ${min_DR} si ${max_DR} unitati.`);
}

// VERIFICARE SI GENERARE PARAMETRI COMUNI
const msg5 = "Verificarea valorilor introduse pentru a determina daca cladirea analizata este reper de inaltime.";
console.log(msg5);

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

function evaluate_HA(HA, LxA, LyA, HB, DR) {
    let min_ranges = [];
    let max_ranges = [];
    
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
        console.log("cladirea analizata nu este reper de inaltime.");
        console.log(`inaltimea cladirii analizate trebuie sa fie cuprinsa intre ${suggested_min} si ${suggested_max} unitati pentru a fi considerata reper de inaltime.`);
    } else {
        console.log("cladirea analizata este considerata reper de inaltime.");
    }
}

evaluate_HA(HA, LxA, LyA, HB, DR);

        // Update the webpage to show the results of the analysis
        // document.getElementById('resultArea').innerText = `Analysis results for the given inputs: HA=${HA}, LxA=${LxA}, LyA=${LyA}, HB=${HB}, DR=${DR}`;

