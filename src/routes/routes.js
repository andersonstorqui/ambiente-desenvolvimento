import React from 'react';
import Authorize from './Authorize';

const DashboardPage = React.lazy(() =>
	import('screens/dashboard/DashboardPage'),
);
const ProfilePage = React.lazy(() => import('screens/profile/ProfilePage'));
const ChangePasswordPage = React.lazy(() =>
	import('screens/profile/ChangePasswordPage'),
);
const UsersPage = React.lazy(() => import('screens/users/UsersPage'));
const UserRegisterPage = React.lazy(() =>
	import('screens/users/UserRegisterPage'),
);
const UserPermissionsPage = React.lazy(() =>
	import('screens/users/UserPermissionsPage'),
);
const HelpPage = React.lazy(() => import('screens/help/HelpPage'));

const BusinessGroupPage = React.lazy(() => import('screens/businessGroup/BusinessGroupPage'))
const BusinessGroupRegisterPage = React.lazy(() => import('screens/businessGroup/BusinessGroupRegisterPage'))

const OperationSegmentPage = React.lazy(() => import('screens/operationSeg/OperationSegPage'))
const OperationSegmentRegisterPage = React.lazy(() => import('screens/operationSeg/OperationSegRegisterPage'))

const DistPage = React.lazy(() => import('screens/dist/DistPage'));
const DistRegisterPage = React.lazy(() => import('screens/dist/DistRegisterPage'));

const ClientPage = React.lazy(() => import('screens/client/ClientPage'));
const ClientRegisterPage = React.lazy(() => import('screens/client/ClientRegisterPage'));


const User = Authorize(false, ['USER']);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: User(DashboardPage),
		permission: false,
	},
	{
		path: '/ajuda',
		name: 'Help',
		component: User(HelpPage),
		permission: false,
	},
	{
		path: '/perfil',
		name: 'Profile',
		component: User(ProfilePage),
		permission: false,
	},
	{
		path: '/perfil/alterar-senha',
		name: 'ChangePassword',
		component: User(ChangePasswordPage),
		permission: false,
	},

	{
		path: '/usuarios',
		name: 'Users',
		component: User(UsersPage),
		permission: true,
		id: 138,
	},
	{
		path: '/usuarios/adicionar',
		name: 'UserRegister',
		component: User(UserRegisterPage),
		permission: true,
		id: 138,
	},
	{
		path: '/usuarios/editar/:id',
		name: 'UserEdit',
		component: User(UserRegisterPage),
		permission: true,
		id: 138,
	},
	{
		path: '/usuarios/permissoes',
		name: 'UserPermissions',
		component: User(UserPermissionsPage),
		permission: true,
		id: 138,
	},

	//CLIENT ROUTES
	{
		path: '/client',
		name: 'Client',
		component: User(ClientPage),
		permission: true,
		id: 141,
	},
	{
		path: '/client/add',
		name: 'Client add',
		component: User(ClientRegisterPage),
		permission: true,
		id: 141,
	},
	{
		path: '/client/editar/:id',
		name: 'Client editar',
		component: User(ClientRegisterPage),
		permission: true,
		id: 141,
	},
	//BUSINESS GROUP ROUTES
	{
		path: '/business-group',
		name: 'Business-group',
		component: User(BusinessGroupPage),
		permission: true,
		id: 142,
	},
	{
		path: '/business-group/add',
		name: 'Business-group-add',
		component: User(BusinessGroupRegisterPage),
		permission: true,
		id: 142,
	},
	{
		path: '/business-group/editar/:id',
		name: 'Business-group-edit',
		component: User(BusinessGroupRegisterPage),
		permission: true,
		id: 142,
	},

	//OPERATION SEGMENT ROUTES
	{
		path: '/operation-segment',
		name: 'Operation Segment',
		component: User(OperationSegmentPage),
		permission: true,
		id: 143,
	},
	{
		path: '/operation-segment/add',
		name: 'Operation Segment add',
		component: User(OperationSegmentRegisterPage),
		permission: true,
		id: 143,
	},
	{
		path: '/operation-segment/editar/:id',
		name: 'Operation Segment add',
		component: User(OperationSegmentRegisterPage),
		permission: true,
		id: 143,
	},

	//DIST ROUTES
	{
		path: '/dist',
		name: 'dist',
		component: User(DistPage),
		permission: true,
		id: 144,
	},
	{
		path: '/dist/add',
		name: 'dist add',
		component: User(DistRegisterPage),
		permission: true,
		id: 144,
	},
	{
		path: '/dist/editar/:id',
		name: 'dist edit',
		component: User(DistRegisterPage),
		permission: true,
		id: 144,
	},
	
];

export default routes;
