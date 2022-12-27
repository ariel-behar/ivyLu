import { RouterProvider } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

import { AuthProvider } from "./context/AuthContext";
import router from "./router/router";

function App() {
	return (
		<>
			<CssBaseline />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</>
	);
}

export default App;
