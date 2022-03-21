import React from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import bn from '../../../lib/utils/bemnames';
import SourceLink from '../SourceLink';
import R from '../../../lib/constants/R';

const bem = bn.create('footer');

const Footer = () => (
	<Navbar className={bem.b('')}>
		<Nav navbar>
			<NavItem>
				2022{' '}
				<SourceLink link="http://modelovencedor.com.br">
					<img src={R.images.logo_oficial} height="50" alt="" />
				</SourceLink>
			</NavItem>
		</Nav>
	</Navbar>
);

export default Footer;
