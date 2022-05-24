import {
	MdBuild,
	MdDashboard,
	MdApps,
	MdOutlinePersonPinCircle,
	MdOutlineOutbond,
	MdBusiness,
	MdSegment,
	MdOutlineVerticalDistribute,
	MdViewModule,
} from 'react-icons/md';
import {
	FaUserAlt,
	FaSuitcase,
	FaFileContract,
	FaMountain,
} from 'react-icons/fa';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { RiPriceTag3Fill } from 'react-icons/ri';

export const navItems = [
	{
		to: '/client',
		name: 'Clientes Modelo Vencedor',
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
		id: 154,
	},
];

export const navApp = [
	{
		to: '/client',
		name: 'Clientes Modelo vencedor',
		exact: false,
		IconSub: MdApps,
		id: 157,
	},
];

export const routes = [
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
	{
		name: 'Aplicações',
		icon: MdApps,
		submodules: navApp,
	},
];
