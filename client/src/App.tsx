import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import RootView from "./views/RootView";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import ProductsView from "./views/ProductsView";
import RegisterView from "./views/RegisterView";
import ServicesView from "./views/ServicesView";
import HomeView from "./views/HomeView";
import { AuthProvider } from "./context/AuthContext";
import LogoutView from "./views/LogoutView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootView />,
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
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
