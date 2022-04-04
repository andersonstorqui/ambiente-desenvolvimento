import { MdBuild, MdDashboard, MdApps, MdOutlinePersonPinCircle, MdBusiness, MdSegment, MdOutlineVerticalDistribute } from 'react-icons/md';
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
	},
	{
		to: '/operation-segment',
		name: 'Segmento de atuação',
		exact: false,
		IconSub: MdSegment,
		id: 143
	},
	{
		to: '/dist',
		name: 'Distribuidora',
		exact: false,
		IconSub: MdOutlineVerticalDistribute,
		id: 144
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
