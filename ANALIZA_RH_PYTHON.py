import math


msg0 = "MODEL MATEMATIC PENTRU ANALIZA PARAMETRILOR - REPERUL DE INALTIME"
print(msg0)


# CRITERIUL 1
msg1 = "Criteriul 1 - dimensiuni preliminare:"
print(msg1)

# Introducere valori
LxA = 8
LyA = 5
HA = 30

# Comparatie LxA, LyA
if LxA >= LyA:
    # Verificare daca HA respecta conditiile, cand LxA > LyA
    if 3*LxA < HA < 12*LxA:
        print("cladirea analizata are forma supla, caracteristica unui reper de inaltime.")
    else:
        print("cladirea analizata nu respecta proportiile unui reper de inaltime.")
        print(f"inaltimea cladirii trebuie sa fie de minim {3*LxA} unitati.")
else:
    # Verificare daca HA respecta conditiile, cand LxA > LyA
    if 3*LyA < HA < 12*LyA:
        print("cladirea analizata are forma supla, caracteristica unui reper de inaltime.")
    else:
        print("cladirea analizata nu are forma caracteristica unui reper de inaltime.")
        print(f"inaltimea cladirii trebuie sa fie de minim {3*LyA} unitati.")


# CRITERIUL 2
msg2 = "Criteriul 2 - parametri de baza:"
print(msg2)

# Introducere valori
HA = 30  
HB = 15   

# Check if HA is smaller than HB
if HA < HB:
    print("inaltimea cladirii analizate este mai mica decat inaltimea cladirii din vecinatate.")
    # Print the minimum value HA should be, which is just greater than HB
    print(f"inaltimea cladirii analizate trebuie sa aibe minim {HB} unitati.")
elif HA > 3*HB:
    print("inaltimea cladirii analizate este prea mare raportata la inaltimea cladirii din vecinatate.")
    # Print the maximum value HA can be and still meet the condition of being less than 3*HB
    print(f"inaltimea cladirii analizate trebuie sa aibe maxim {3*HB} unitati.")
else:
    # HA meets the conditions of being greater than HB but smaller than 3*HB
    print("inaltimea cladirii analizate este potrivita in relatie cu caldirea din vecinatate.")


# CRITERIUL 3
msg3 = "Criteriul 3 - parametri relativi:"
print(msg3)

# Introducere valori
HA = 20
HB = 5
DR = 2

# Calculate conditions
condition_A_min = round(4*HB/3 + DR*math.sqrt(3))
condition_B_min = round(4*HB/3 + DR)
condition_C_min = round((4*HB*math.sqrt(3) + DR) / (3*math.sqrt(3)))

# General condition for being smaller than 3*HB
condition_max = round(3*HB)

# Check conditions
if HA < condition_max and HA > condition_A_min:
    print("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.")
elif HA < condition_max and HA > condition_B_min:
    print("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.")
elif HA < condition_max and HA > condition_C_min:
    print("cladirea analizata este suficient de inalta incat sa fie perceputa ca reper de intaltime in relatie cu caldirile vecine.")
else:
    # HA does not meet any of the conditions
    print("inaltimea cladirii analizate nu se incadreaza in intervalul impus de inaltimea cladirilor vecine.")
    # Suggest a range for HA
    suggested_min = max(condition_A_min, condition_B_min, condition_C_min)
    print(f"inaltimea cladrii analizate trebuie sa fie cuprinsa intre {suggested_min} si {condition_max} unitati.")


# CRITERIUL 4
msg4 = "Criteriul 4 - distanța de percepție vizuală:"
print(msg4)

# Introducere valori
HA = 20
HB = 5
DR = 10

# Calculate the maximum and minimum values for DR
max_DR = round((3*HA*math.sqrt(3)) - (4*HB*math.sqrt(3)))
min_DR = round((HA - (4*HB / 3)) / math.sqrt(3))

# Check if DR falls within the range
if min_DR < DR < max_DR:
    print("distanta dintre cladirea analizata si cladirea vecina este optima.")
else:
    # DR does not respect the instructions
    print(f"distanta dintre cladirea analizata si cladirea vecina nu respecta criteriul.")
    # Generate a suggestion for the acceptable range for DR
    print(f"distanta dintre cladirea analizata si cladirea vecina trebuie sa fie cuprinsa intre {min_DR} si {max_DR} unitati.")


# VERIFICARE SI GENERARE PARAMETRI COMUNI
msg5 = "Verificarea valorilor introduse pentru a determina daca cladirea analizata este reper de inaltime."
print(msg5)

def criterion_1(HA, LxA, LyA):
    if LxA >= LyA:
        min_HA = round(3*LxA)
        max_HA = round(12*LxA)
    else:
        min_HA = round(3*LyA)
        max_HA = round(12*LyA)
    return HA > min_HA and HA < max_HA, (min_HA, max_HA)

def criterion_2(HA, HB):
    return HA > HB and HA < 3*HB, (HB, 3*HB)

def criterion_3(HA, HB, DR):
    condition_A_min = round(4*HB/3 + DR*math.sqrt(3))
    condition_B_min = round(4*HB/3 + DR)
    condition_C_min = round((4*HB*math.sqrt(3) + DR) / (3*math.sqrt(3)))
    condition_max = round(3*HB)
    min_HA = max(condition_A_min, condition_B_min, condition_C_min)
    return HA > min_HA and HA < condition_max, (min_HA, condition_max)

def evaluate_HA(HA, LxA, LyA, HB, DR):
    # Initial range values for HA, considering all possible conditions
    min_ranges = []
    max_ranges = []
    
    # Check each criterion
    crit1_pass, crit1_range = criterion_1(HA, LxA, LyA)
    crit2_pass, crit2_range = criterion_2(HA, HB)
    crit3_pass, crit3_range = criterion_3(HA, HB, DR)
    
    # Collect ranges for which criteria failed
    if not crit1_pass:
        min_ranges.append(crit1_range[0])
        max_ranges.append(crit1_range[1])
    if not crit2_pass:
        min_ranges.append(crit2_range[0])
        max_ranges.append(crit2_range[1])
    if not crit3_pass:
        min_ranges.append(crit3_range[0])
        max_ranges.append(crit3_range[1])
    
    # If HA fails any criterion, suggest a common range
    if not (crit1_pass and crit2_pass and crit3_pass):
        suggested_min = min(max_ranges)
        suggested_max = max(min_ranges)
        print("cladirea analizata nu este reper de inaltime.") 
        print(f"inaltimea cladirii analizate trebuie sa fie cuprinsa intre {suggested_min} si {suggested_max} unitati pentru a fi considerata reper de inaltime.")
    else:
        print("cladirea analizata este considerata reper de inaltime.")

evaluate_HA(HA, LxA, LyA, HB, DR)