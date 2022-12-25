import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

import { AuthProvider } from "./context/AuthContext";

import RootView from "./views/RootView";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import ProductsView from "./views/ProductsView";
import RegisterView from "./views/RegisterView";
import ServicesView from "./views/ServicesView";
import HomeView from "./views/HomeView";
import LogoutView from "./views/LogoutView";
import ErrorView from "./views/ErrorView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootView />,
		errorElement: <ErrorView />,
		children: [
			{
				index: true,
				element: <HomeView />
			},
			{
				path: "/register",
				element: <RegisterView />
			},
			{
				path: "/login",
				element: <LoginView />
			},
			{
				path: "/logout",
				element: <LogoutView />
			},
			{
				path: "/products",
				element: <ProductsView />
			},
			{
				path: "/services",
				element: <ServicesView />
			},
			{
				path: "/dashboard",
				element: <DashboardView />
			}
		]
	}
]);

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
