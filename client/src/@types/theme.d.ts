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

    interface Palette {
        main: {
            black: PaletteColor,
            beige: PaletteColor,
            beigeLight: PaletteColor,
            darkGrey: PaletteColor,
            teal: {
                primary: PaletteColor,
                light: PaletteColor,
                dark: PaletteColor
            },
            yellow: {
                primary: PaletteColor,
                light: PaletteColor,
                dark: PaletteColor,
                darkest: PaletteColor,
            },
        }
    }

    interface PaletteOptions {
        main: {
            black: string | PaletteColorOptions,
            beige: string | PaletteColorOptions,
            beigeLight: string | PaletteColorOptions,
            darkGrey: string | PaletteColorOptions,
            teal: {
                primary: string | PaletteColorOptions,
                light: string | PaletteColorOptions,
                dark: string | PaletteColorOptions
            },
            yellow: {
                primary: string | PaletteColorOptions,
                light: string | PaletteColorOptions,
                dark: string | PaletteColorOptions,
                darkest: string | PaletteColorOptions,
            },
            
            
        }
    }

    // interface SimplePaletteColorOptions {
    //     darker?: string
    // }

    // interface PaletteColor {
    //     darker?: string
    // }
}