const msg0 = "MODEL MATEMATIC PENTRU GENERAREA PARAMETRILOR - REPERUL DE INALTIME";
console.log(msg0);


// CRITERIUL 1
const msg1 = "Criteriul 1 - dimensiuni preliminare:";
console.log(msg1);

let LxA = 10;
let LyA = 5;

function determine_HA_range_c1(LxA, LyA) {
    let min_HA, max_HA;
    if (LxA >= LyA) {
        min_HA = Math.round(3 * LxA);
        max_HA = Math.round(12 * LxA);
    } else {
        min_HA = Math.round(3 * LyA);
        max_HA = Math.round(12 * LyA);
    }
    console.log(`Inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.`);
}

determine_HA_range_c1(LxA, LyA);

// CRITERIUL 2
const msg2 = "Criteriul 2 - parametri de baza:";
console.log(msg2);

let HB = 20;

function determine_HA_range_c2(HB) {
    let min_HA = Math.round(3 / 2 * HB);
    let max_HA = Math.round(3 * HB);
    console.log(`Inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.`);
}

determine_HA_range_c2(HB);

// CRITERIUL 3
const msg3 = "Criteriul 3 - parametri relativi:";
console.log(msg3);

let DR = 10;

function determine_HA_range_c31(HB, DR) {
    let min_HA_60g = Math.round((4 * HB / 3) + DR * Math.sqrt(3));
    let max_HA_60g = Math.round(3 * HB);
    console.log(`Pentru O=60gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_60g} si ${max_HA_60g} unitati.`);

    let min_HA_45g = Math.round((4 * HB / 3) + DR);
    let max_HA_45g = Math.round(3 * HB);
    console.log(`Pentru O=45gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_45g} si ${max_HA_45g} unitati.`);

    let min_HA_30g = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
    let max_HA_30g = Math.round(3 * HB);
    console.log(`Pentru O=30gr, inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA_30g} si ${max_HA_30g} unitati.`);
}

determine_HA_range_c31(HB, DR);

function determine_HA_range_c32(HB, DR) {
    let min_HA = Math.round((4 * HB * Math.sqrt(3) + DR) / (3 * Math.sqrt(3)));
    let max_HA = Math.round((4 * HB / 3) + DR * Math.sqrt(3));
    console.log(`inaltimea reperului propus trebuie sa fie cuprinsa intre ${min_HA} si ${max_HA} unitati.`);
}

determine_HA_range_c32(HB, DR);

// CRITERIUL 4
const msg4 = "Criteriul 4 - distanța de percepție vizuală:";
console.log(msg4);

let HA = 75;

function determine_DR_range_c4(HA, HB) {
    let min_DR = Math.round((HA - (4 * HB / 3)) / Math.sqrt(3));
    let max_DR = Math.round((3 * HA * Math.sqrt(3)) - (4 * HB * Math.sqrt(3)));
    console.log(`distanta dintre reperul de inaltime propus si cladirea existenta trebuie sa fie cuprinsa intre ${min_DR} si ${max_DR} unitati.`);
}

determine_DR_range_c4(HA, HB);

// VERIFICARE SI GENERARE PARAMETRI COMUNI
const msg5 = "Verificarea si generarea parametrilor comuni pentru inaltimea reperului propus";
console.log(msg5);

function find_common_HA_range(LxA, LyA, HB, DR) {
    let ranges = [];

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
            console.log(`Intervalul comun pentru parametrii reperului propus este intre ${common_min} si ${common_max} unitati.`);
        } else {
            console.log("Nu exista un interval comun pentru valorile inaltimii reperului propus");
        }
    } else {
        console.log("Nu se poate calcula intervalul comun pentru valorile introduse");
    }
}

find_common_HA_range(LxA, LyA, HB, DR);
