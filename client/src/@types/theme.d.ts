import { PaletteColorOptions} from '@mui/material/styles'

declare module '@mui/material/styles' {

    // interface Theme {
    //     status: {
    //         danger: string
    //     }
    // }

    // interface ThemeOptions {
    //     status: {
    //         danger: React.CSSProperties['color']
    //     }
    // }

    // interface Palette {
    //     main?: {
    //         primary: string | PaletteColor
    //     }
    // }

    interface PaletteOptions {
        main?: {
            black?: string | PaletteColorOptions,
            beige?: string | PaletteColorOptions,
            darkGrey?: string | PaletteColorOptions,
            teal?: string | PaletteColorOptions
        }
        mainContrast: {
            white?: string | PaletteColorOptions
        }
    }

    // interface SimplePaletteColorOptions {
    //     darker?: string
    // }

    // interface PaletteColor {
    //     darker?: string
    // }
}