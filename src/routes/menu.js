import { MdBuild, MdDashboard, MdApps, MdOutlinePersonPinCircle, MdBusiness, MdSegment, MdOutlineVerticalDistribute, MdViewModule } from 'react-icons/md';
import { FaUserAlt, FaSuitcase, FaFileContract } from 'react-icons/fa';
import { BsFillLightningChargeFill } from 'react-icons/bs';
import { RiPriceTag3Fill } from 'react-icons/ri';

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
	},
	{
		to: '/merchant',
		name: 'Comercializador de energia',
		exact: false,
		IconSub: FaSuitcase,
		id: 145
	},
	{
		to: '/modulation',
		name: 'Modulação',
		exact: false,
		IconSub: MdViewModule,
		id: 146
	},
	{
		to: '/energy-types',
		name: 'Tipos de energia',
		exact: false,
		IconSub: BsFillLightningChargeFill,
		id: 147
	},
	{
		to: '/contracts',
		name: 'Contratos',
		exact: false,
		IconSub: FaFileContract,
		id: 148
	},
	{
		to: '/prices',
		name: 'Preços',
		exact: false,
		IconSub: RiPriceTag3Fill,
		id: 149
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
