import { createBrowserRouter } from "react-router-dom";
import { getAllServicesLoader, getOneServicesAndHairdressersLoader, getOneServicesLoader } from '../data-loaders/servicesLoader'
import { getAllProductsLoader, getOneProductsLoader } from "../data-loaders/productsLoader";
import { getAllClientsLoader } from "../data-loaders/clientsLoader";

import RootView from "../views/RootView";
import DashboardView from "../views/DashboardView";
import LoginView from "../views/LoginView";
import ProductsView from "../views/ProductsView";
import RegisterView from "../views/RegisterView";
import HomeView from "../views/HomeView";
import LogoutView from "../views/LogoutView";
import ErrorView from "../views/ErrorView";
import ServicesOperatorAdminView from "../views/AuthorizedViews/ServicesViews/ServicesOperatorAdminView";
import CreateService from "../views/AuthorizedViews/ServicesViews/CreateService";
import ManagementView from "../views/AuthorizedViews/ManagementView";
import ProductsManagementView from "../views/AuthorizedViews/ProductViews/ProductsManagementView";
import UsersManagementView from "../views/AuthorizedViews/UsersViews/UsersManagementView";
import OrdersManagementView from "../views/AuthorizedViews/OrdersViews/OrdersManagementView";
import EditService from "../views/AuthorizedViews/ServicesViews/EditService";
import CreateProduct from "../views/AuthorizedViews/ProductViews/CreateProduct";
import EditProduct from "../views/AuthorizedViews/ProductViews/EditProduct";
import AboutView from "../views/AboutView";
import ServiceDetailsView from "../views/ServiceViews/ServiceDetailsView";
import ServicesView from "../views/ServiceViews/ServicesView";
import ServicesManagementView from "../views/AuthorizedViews/ServicesViews/ServicesManagementView";
import ProductsOperatorAdminView from "../views/AuthorizedViews/ProductViews/ProductsOperatorAdminView";
import OurTeamView from "../views/OurTeamView";
import ClientsAdminView from "../views/AuthorizedViews/UsersViews/ClientsAdminView";
import RegisterAuthorizedView from "../views/AuthorizedViews/UsersViews/RegisterAuthorizedView";
import { getAllHairdressers, getAllStaffLoader } from "../data-loaders/staffLoader";
import StaffAdminView from "../views/AuthorizedViews/UsersViews/StaffAdminView";
import ScheduleManagementView from "../views/AuthorizedViews/Schedule/ScheduleManagementView";
import ServicesGuestCustomerView from "../views/ServiceViews/ServicesGuestCustomerView";

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
				children: [
					{
						index: true,
						loader: getAllServicesLoader,
						element: <ServicesGuestCustomerView />
					},
					{
						path: ':serviceId/schedule',
						loader: getOneServicesAndHairdressersLoader,
						element: <ServiceDetailsView />
					}
				]
			},
			{
				path: "/our-team",
				loader: getAllHairdressers,
				element: <OurTeamView />
			},
			{
				path: "/about",
				element: <AboutView />
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
						path: 'schedule',
						element: <ScheduleManagementView />
					},
					{
						path: 'services',
						element: <ServicesManagementView />,
						children: [
							{
								index: true,
								loader: getAllServicesLoader,
								element: <ServicesOperatorAdminView />,
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
								element: <ProductsOperatorAdminView />,
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
						path: 'clients',
						element: <UsersManagementView />,
						children: [
							{
								index: true,
								loader: getAllClientsLoader,
								element: <ClientsAdminView />,
							},
						]
					},
					{
						path: 'staff',
						element: <UsersManagementView />,
						children: [
							{
								index: true,
								loader: getAllStaffLoader,
								element: <StaffAdminView />,
							},
							{
								path: 'create',
								element: <RegisterAuthorizedView />
							}
						]
					}

				]
			}

		]
	}
]);

export default router;