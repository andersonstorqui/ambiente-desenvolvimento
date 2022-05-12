import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/BondContractsClient/BondContractsClientForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	bondContractClientActions,
	contractsActions,
	clientActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class BondPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetBond,
			onGetClients,
			onGetContract,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetBond({ id: id });
		}

		await onGetClients();
		await onGetContract();
	}

	onSubmit = data => {
		const { onAddBond, onEditBond } = this.props;
		const { id } = this.state;

		if (id) {
			console.log(data)
			onEditBond(data, id);
		} else {
			onAddBond(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			bond,
			loading,
			contracts,
			clients
		} = this.props;

		//CLIENT OPTIONS
		let clientOptions
		if (clients != false) {
			clientOptions = clients.map(index => ({ id: index.id, name: `${index.client} - UC ${index.unid_consumer} - DISTRIBUIDORA ${index.dist_name}` }))
		}
		//CONTRACT OPTIONS
		let contractOptions
		if (contracts != false) {
			contractOptions = contracts.map(index => ({ id: index.id, name: index.contracts_cod, data: index}))
		}
		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Vínculos contratos e clientes"
				pathParent="/Vínculos contratos e clientes"
				breadcrumbs={[
					{
						name: id ? 'Editar Vínculos contratos e clientes' : 'Adicionar Vínculos contratos e clientes',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !bond : loading}>
					<Form
						list={bond[0]}
						clientOptions={clientOptions || [0]}
						contractOptions={contractOptions || [0]}
						onSubmit={data => this.onSubmit(data)}
						handleNavigation={() => navigateBack()}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.api.loading,
		bond: state.bond.list,
		contracts: state.contracts.list,
		clients: state.client.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetBond: id => dispatch(bondContractClientActions.getBondContractClient(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddBond: data => dispatch(bondContractClientActions.insertBondContractClient(data)),
		onEditBond: (data, id) => dispatch(bondContractClientActions.updateBondContractClient(data, id)),
		onGetContract: query => dispatch(contractsActions.getContracts(query)),
		onGetClients: query => dispatch(clientActions.getClient(query)),
	};
};

BondPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddBond: PropTypes.func.isRequired,
	onEditBond: PropTypes.func.isRequired,
	onGetBond: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BondPage);
