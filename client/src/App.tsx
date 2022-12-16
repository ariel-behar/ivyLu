import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import RootView from "./views/RootView";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import ProductsView from "./views/ProductsView";
import RegisterView from "./views/RegisterView";
import ServicesView from "./views/ServicesView";
import HomeView from "./views/HomeView";

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
		<RouterProvider router={router} />
	);
}

export default App;
