import { MdBuild, MdDashboard, MdApps, MdOutlinePersonPinCircle, MdBusiness, MdListAlt, MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaUserAlt, FaMountain } from 'react-icons/fa';

export const navItems = [
	{
		to: '/',
		name: 'Dashboard',
		exact: true,
		Icon: MdDashboard,
	},
];

export const navAux = [
	{
		to: '/usuarios',
		name: 'Usuários',
		exact: false,
		IconSub: FaUserAlt,
		id: 138,
	},
	
];

export const navApp = [
	{
		to: '/client',
		name: 'Cliente',
		exact: false,
		IconSub: MdOutlinePersonPinCircle,
		id: 141
	},
	{
		to: '/business-group',
		name: 'Grupo empresarial',
		exact: false,
		IconSub: MdBusiness,
		id: 142
	}
]





export const routes = [
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
	
	{
		name: 'Aplicações',
		icon: MdApps,
		submodules: navApp
	}
];
