import { createTheme } from '@mui/material'

const theme = createTheme({
	palette: {
		main: {
			black: '#2c2c2c',
            beige: '#F3EFE0',
            darkGrey: '#434242',
            teal: '#22A39F'
		},
        mainContrast: {
            white: 'white'
        }
	}
})

export default theme;