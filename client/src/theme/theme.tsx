import { createTheme } from '@mui/material'

const theme = createTheme({
	palette: {
		main: {
			black: '#2c2c2c',
            beige: '#F3EFE0',
            beigeLight: '#faf8f2',
            darkGrey: '#434242',
            teal: {
				primary: '#4bb5ab',
				light: '#82e9de',
				dark: '#00867d'
			},
			yellow:{
				primary: '#ffeb3b',
				light: '#ffee58',
				dark: '#fdd835',
				darkest: '#c8b900'
			}
			
			
		}
	}
})

export default theme;