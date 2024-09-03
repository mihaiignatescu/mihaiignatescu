function evaluate_HA(LxA, LyA, HB, DR) {
    document.getElementById('outputArea').innerHTML = ""; // Clear previous content
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
            output += (`Înălțimea reperului trebuie să fie cuprinsă între: <br>
                ${common_min} și ${common_max} metri`);
        } else {
            output += ("Nu poate fi generat intervalul, te rog să verifici valorile introduse");
        }
    } else {
        output += ("Nu se poate calcula intervalul de valori minime și maxime, te rog reintrodu valorile");
    }
    document.getElementById('outputArea').innerHTML = output;
}