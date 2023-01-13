interface IMeasurementUnits {
    milliliters: {
        capitalized: string,
        abbreviated: string,
        lowerCase: string
    },
    grams: {
        capitalized: string,
        abbreviated: string,
        lowerCase: string
    }
}

export const measurementUnitsObj: IMeasurementUnits = {
    milliliters: {
        capitalized: 'Milliliters',
        abbreviated: 'ml',
        lowerCase: 'milliliters'
    },
    grams: {
        capitalized: 'Grams',
        abbreviated: 'gr',
        lowerCase: 'grams'
    }
}

export const getMeasurementUnit = (unit: string) => {
    switch (unit) {
        case 'milliliters':
            return measurementUnitsObj['milliliters'] 
        case 'grams':
            return measurementUnitsObj['grams'] 
        default:
            return {
                capitalized: 'Invalid unit input',
                abbreviated: 'Invalid unit input',
                lowerCase: 'Invalid unit input'
            }
    }
}