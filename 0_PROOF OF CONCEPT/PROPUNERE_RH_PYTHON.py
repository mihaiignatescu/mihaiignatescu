import math


msg0 = "MODEL MATEMATIC PENTRU GENERAREA PARAMETRILOR - REPERUL DE INALTIME"
print(msg0)


# CRITERIUL 1
msg1 = "Criteriul 1 - dimensiuni preliminare:"
print(msg1)

LxA = 10
LyA = 5

def determine_HA_range_c1(LxA, LyA):
    if LxA >= LyA:
        min_HA = round(3 * LxA)
        max_HA = round(12 * LxA)
        print(f"Inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA} si {max_HA} unitati.")
    else:
        min_HA = round(3 * LyA)
        max_HA = round(12 * LyA)
        print(f"Inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA} si {max_HA} unitati.")

determine_HA_range_c1(LxA, LyA)


# CRITERIUL 2
msg2 = "Criteriul 2 - parametri de baza:"
print(msg2)

HB = 20

def determine_HA_range_c2(HB):
    min_HA = round(3/2 * HB)
    max_HA = round(3 * HB)
    print(f"Inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA} si {max_HA} unitati.")

determine_HA_range_c2(HB)


# CRITERIUL 3
msg3 = "Criteriul 3 - parametri relativi:"
print(msg3)

HB = HB
DR = 10

def determine_HA_range_c31(HB, DR):
    # Unghiul alfa = 60 grade
    min_HA_60g = round((4*HB/3) + DR*math.sqrt(3))
    max_HA_60g = round(3*HB)
    print(f"Pentru O=60gr, inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA_60g} si {max_HA_60g} unitati.")

    # Unghiul alfa = 45 grade
    min_HA_45g = round((4*HB/3) + DR)
    max_HA_45g = round(3*HB)
    print(f"Pentru O=45gr, inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA_45g} si {max_HA_45g} unitati.")

    # Unghiul alfa = 30 grade
    min_HA_30g = round((4*HB*math.sqrt(3) + DR) / (3*math.sqrt(3)))
    max_HA_30g = round(3*HB)
    print(f"Pentru O=30gr, inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA_30g} si {max_HA_30g} unitati.")

determine_HA_range_c31(HB, DR)


def determine_HA_range_c32(HB, DR):
    # Valoarea minima HA
    min_HA = round((4*HB*math.sqrt(3) + DR) / (3*math.sqrt(3)))
    
    # Valoarea maxima HA
    max_HA = round((4*HB/3) + DR*math.sqrt(3))
    
    # Afisare interval HA
    print(f"inaltimea reperului propus trebuie sa fie cuprinsa intre {min_HA} si {max_HA} unitati.")

determine_HA_range_c32(HB, DR)


# CRITERIUL 4
msg4 = "Criteriul 4 - distanța de percepție vizuală:"
print(msg4)

HA = 75
HB = HB

def determine_DR_range_c4(HA, HB):
    # Valoarea minima DR
    min_DR = round((HA - (4*HB/3)) / math.sqrt(3))
    
    # Valoarea maxima DR
    max_DR = round((3*HA*math.sqrt(3)) - (4*HB*math.sqrt(3)))
    
    # Print the range for DR
    print(f"distanta dintre reperul de inaltime propus si cladirea existenta trebuie sa fie cuprinsa intre {min_DR} si {max_DR} unitati.")

determine_DR_range_c4(HA, HB)


# VERIFICARE SI GENERARE PARAMETRI COMUNI
msg5 = "Verificarea si generarea parametrilor comuni pentru inaltimea reperului propus"
print(msg5)

# FUNCTIE INTEGRANTA DE VERIFICARE A INTERVALULUI COMUN
def find_common_HA_range(LxA=None, LyA=None, HB=None, DR=None):
    ranges = []  # To store all valid ranges

    if LxA is not None and LyA is not None:
        min_HA_c1 = round(3 * max(LxA, LyA))
        max_HA_c1 = round(12 * max(LxA, LyA))
        ranges.append((min_HA_c1, max_HA_c1))
    
    if HB is not None:
        min_HA_c2 = round(3/2 * HB)
        max_HA_c2 = round(3 * HB)
        ranges.append((min_HA_c2, max_HA_c2))
    
    if HB is not None and DR is not None:
        min_HA_c3 = round((4*HB*math.sqrt(3) + DR) / (3*math.sqrt(3)))
        max_HA_c3 = round((4*HB/3) + DR*math.sqrt(3))
        ranges.append((min_HA_c3, max_HA_c3))

    if ranges:
        common_min = round(max([r[0] for r in ranges]))
        common_max = round(min([r[1] for r in ranges]))

        if common_min <= common_max:
            return common_min, common_max
        else:
            return "Nu exista un interval comun pentru valorile inaltimii reperului propus"
    else:
        return "Nu se poate calcula intervalul comun pentru valorile introduse"

common_range = find_common_HA_range(LxA=LxA, LyA=LyA, HB=HB, DR=DR)

if isinstance(common_range, tuple):
    min_value, max_value = common_range
    print(f"Intervalul comun pentru parametrii reperului propus este {common_range}, inaltimea minima este {min_value} unitati, inaltimea maxima este {max_value} unitati.")
    print(f"Inaltimea reperului propus trebuie sa fie cuprinsa intre {min_value} si {max_value} unitati.")
else:
    print("Nu exista un interval comun pentru valorile inaltimii reperului propus")



