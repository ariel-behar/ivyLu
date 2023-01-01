import { RouterProvider } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/AuthContext";
import router from "./router/router";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

function App() {
	return (
		<>
			<CssBaseline />
			<AuthProvider>
				<NotificationProvider>
					<ThemeProvider theme={theme}>
						<RouterProvider router={router} />
					</ThemeProvider>
				</NotificationProvider>
			</AuthProvider>
		</>
	);
}

export default App;

