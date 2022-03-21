import { MdBuild, MdDashboard, MdApps, MdDeliveryDining, MdPointOfSale, MdListAlt, MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

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



export const routes = [
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
	
	
];
