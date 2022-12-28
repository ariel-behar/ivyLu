import { createBrowserRouter } from "react-router-dom";
import { getAllServicesLoader, getOneServicesLoader } from '../data-loaders/servicesLoader'
import { getAllProductsLoader, getOneProductsLoader } from "../data-loaders/productsLoader";
import { getAllUsersLoader } from "../data-loaders/userLoader";

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
import CreateProduct from "../views/AuthorizedViews/ProductViews/CreateProduct";
import EditProduct from "../views/AuthorizedViews/ProductViews/EditProduct";
import UsersView from "../views/AuthorizedViews/UsersViews/UsersView";


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
				loader: getAllProductsLoader,
				element: <ProductsView />,
			},
			{
				path: "/services",
				loader: getAllServicesLoader,
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
						element: <ServicesManagementView />,
						children: [
							{
								index: true,
								loader: getAllServicesLoader,
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
						element: <ProductsManagementView />,
						children: [
							{
								index: true,
								loader: getAllProductsLoader,
								element: <ProductsView />,
							},
							{
								path: 'create',
								element: <CreateProduct />
							},
							{
								path: ':productId/edit',
								loader: getOneProductsLoader,
								element: <EditProduct />
							}
						]
					},
					{
						path: 'users',
						element: <UsersManagementView />,
						children: [
							{
								index: true,
								loader: getAllUsersLoader,
								element: <UsersView />,
							}
						]
					}

				]
			}

		]
	}
]);

export default router;