import React from "react";
import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";
import { getAllServicesLoader, getOneServicesAndHairdressersLoader, getOneServicesLoader } from '../data-loaders/servicesLoader'
import { getAllProductsLoader, getOneProductLoader } from "../data-loaders/productsLoader";
import { getAllClientsLoader } from "../data-loaders/clientsLoader";
import { getAllOrdersLoader } from "../data-loaders/ordersLoader";
import { getAllHairdressers, getAllStaffLoader, getOneStaffMemberLoader } from "../data-loaders/staffLoader";
import { getScheduleForAllLoader } from "../data-loaders/scheduleLoader";

import RootView from "../views/RootView";

import LoginView from "../views/LoginView";
import ProductsView from "../views/ProductViews/ProductsView";
import RegisterView from "../views/RegisterView";
import HomeView from "../views/HomeView";
import LogoutView from "../views/LogoutView";
import ErrorView from "../views/ErrorView";
import ServicesOperatorAdminView from "../views/AuthorizedViews/ServicesViews/ServicesOperatorAdminView";
import CreateService from "../views/AuthorizedViews/ServicesViews/CreateService";
import ProductsManagementView from "../views/AuthorizedViews/ProductViews/ProductsManagementView";
import UsersManagementView from "../views/AuthorizedViews/UsersViews/UsersManagementView";
import OrdersManagementView from "../views/AuthorizedViews/OrdersViews/OrdersManagementView";
import EditService from "../views/AuthorizedViews/ServicesViews/EditService";
import CreateProduct from "../views/AuthorizedViews/ProductViews/CreateProduct";
import EditProduct from "../views/AuthorizedViews/ProductViews/EditProduct";
import AboutView from "../views/AboutView";
import ServiceDetailsView from "../views/ServiceViews/ServiceDetailsView";
import ServicesRootView from "../views/ServiceViews/ServicesRootView";
import ServicesManagementView from "../views/AuthorizedViews/ServicesViews/ServicesManagementView";
import ProductsOperatorAdminView from "../views/AuthorizedViews/ProductViews/ProductsOperatorAdminView";
import OurTeamView from "../views/OurTeamView";
import ClientsAdminView from "../views/AuthorizedViews/UsersViews/ClientsAdminView";
import StaffAdminView from "../views/AuthorizedViews/UsersViews/StaffAdminView";
import ScheduleManagementView from "../views/AuthorizedViews/Schedule/ScheduleManagementView";
import ServicesView from "../views/ServiceViews/ServicesView";
import ProductsRootView from "../views/ProductViews/ProductsRootView";
import ProductOrderView from "../views/ProductViews/ProductOrderView";
import ShoppingCartView from "../views/ShoppingCartView";
import GalleryView from "../views/GalleryView";
import RegisterEditAuthorizedUserView from "../views/AuthorizedViews/UsersViews/RegisterEditAuthorizedUserView";
import ProfileView from "../views/AuthorizedViews/DashboardView/ProfileView";
import ClientOrdersView from "../views/AuthorizedViews/DashboardView/ClientOrdersView";
import ClientAppointmentsView from "../views/AuthorizedViews/DashboardView/ClientAppointmentsView";

const LazyDashboardView = lazy(() => import('../views/AuthorizedViews/DashboardView/DashboardView'))
const LazyManagementRootView = lazy(() => import('../views/AuthorizedViews/ManagementRootView'))

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
			{ // products
				path: "/products",
				element: <ProductsRootView />,
				children: [
					{
						index: true,
						loader: getAllProductsLoader,
						element: <ProductsView />,
					},
					{
						path: ':productId/order',
						loader: getOneProductLoader,
						element: <ProductOrderView />
					}
				]
			},
			{ // /services
				path: "/services",
				loader: getAllServicesLoader,
				element: <ServicesRootView />,
				children: [
					{
						index: true,
						element: <ServicesView />
					},
					{
						path: ':serviceId/schedule',
						loader: getOneServicesAndHairdressersLoader,
						element: <ServiceDetailsView />
					}
				]
			},
			{
				path: "/gallery",
				element: <GalleryView />
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
				path: "/shopping-cart",
				element: <ShoppingCartView />
			},
			{
				path: "/dashboard",
				element: <Suspense fallback='loading...'>
							<LazyDashboardView />
						</Suspense>,
				children: [
					{
						index: true,
						element: <ProfileView />
					},
					{
						path: 'profile',
						element: <ProfileView />
					},
					{
						path: 'orders',
						element: <ClientOrdersView />
					},
					{
						path: 'appointments',
						element: <ClientAppointmentsView />
					}
				]
			},
			{ // /management
				path: "/management",
				element: <Suspense fallback='loading...'>
							<LazyManagementRootView />
						</Suspense>,
				children: [
					{
						index: true,
						loader: getAllOrdersLoader,
						element: <OrdersManagementView />
					},
					{
						path: 'orders',
						loader: getAllOrdersLoader,
						element: <OrdersManagementView />
					},
					{
						path: 'schedule',
						loader: getScheduleForAllLoader,
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
								loader: getOneProductLoader,
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
								path: 'register',
								element: <RegisterEditAuthorizedUserView formType="register"/>
							},
							{
								path: ':userId/edit',
								loader: getOneStaffMemberLoader,
								element: <RegisterEditAuthorizedUserView formType="edit" />
							}
						]
					}
				]
			}
		]
	}
]);

export default router;