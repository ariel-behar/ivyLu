interface measurementUnitsInterface {
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

export const measurementUnits: measurementUnitsInterface = {
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
            return measurementUnits['milliliters'] 
        case 'grams':
            return measurementUnits['grams'] 
        default:
            return {
                capitalized: 'Invalid unit input',
                abbreviated: 'Invalid unit input',
                lowerCase: 'Invalid unit input'
            }
    }
}