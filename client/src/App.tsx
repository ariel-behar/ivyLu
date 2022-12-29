import { RouterProvider } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/AuthContext";
import router from "./router/router";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
	return (
		<>
			<CssBaseline />
			<AuthProvider>
				<NotificationProvider>
					<RouterProvider router={router} />
				</NotificationProvider>
			</AuthProvider>
		</>
	);
}

export default App;

