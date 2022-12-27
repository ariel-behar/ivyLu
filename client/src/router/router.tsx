import { createBrowserRouter } from "react-router-dom";
import { getAllservicesLoader, getOneServicesLoader } from '../data-loaders/servicesLoader'

import RootView from "../views/RootView";
import DashboardView from "../views/DashboardView";
import LoginView from "../views/LoginView";
import ProductsView from "../views/ProductsView";
import RegisterView from "../views/RegisterView";
import ServicesView from "../views/ServicesView";
import HomeView from "../views/HomeView";
import LogoutView from "../views/LogoutView";
import ErrorView from "../views/ErrorView";
import ServicesManagementView from "../views/AuthorizedViews/ServicesViews/ServicesManagementView";
import CreateService from "../views/AuthorizedViews/ServicesViews/CreateService";
import ManagementView from "../views/AuthorizedViews/ManagementView";
import ProductsManagementView from "../views/AuthorizedViews/ProductViews/ProductsManagementView";
import UsersManagementView from "../views/AuthorizedViews/UsersViews/UsersManagementView";
import OrdersManagementView from "../views/AuthorizedViews/OrdersViews/OrdersManagementView";
import EditService from "../views/AuthorizedViews/ServicesViews/EditService";

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
				loader: getAllservicesLoader,
				element: <ServicesView />,
			},
			{
				path: "/dashboard",
				element: <DashboardView />
			},
			{
				path: "/management",
				element: <ManagementView />,
				children: [
					{
						index: true,
						element: <OrdersManagementView />
					},
					{
						path: 'orders',
						element: <OrdersManagementView />
					},
					{
						path: 'services',
						loader: getAllservicesLoader,
						element: <ServicesManagementView />,
						children: [
							{
								index: true,
								loader: getAllservicesLoader,
								element: <ServicesView />,
							},
							{
								path: 'create',
								element: <CreateService />
							},
							{
								path: ':serviceId/edit',
								loader: getOneServicesLoader,
								element: <EditService />
							}
						]
					},
					{
						path: 'products',
						element: <ProductsManagementView />
					},
					{
						path: 'users',
						element: <UsersManagementView />
					}

				]
			}

		]
	}
]);

export default router;