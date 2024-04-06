import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "@mui/material";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import router from "./router/router";

import theme from "./theme/theme";

if(process.env.NODE_ENV === 'development') disableReactDevTools();

function App() {
	return (
		<>
			<CssBaseline />
			<AuthProvider>
				<NotificationProvider>
					<ShoppingCartProvider>
						<ThemeProvider theme={theme}>
							<RouterProvider router={router} />
						</ThemeProvider>
					</ShoppingCartProvider>
				</NotificationProvider>
			</AuthProvider>
		</>
	);
}

export default App;

