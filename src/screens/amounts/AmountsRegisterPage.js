import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Amounts/AmountsForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	amountActions,
	bondContractClientActions,
	clientActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class AmountsRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetAmounts,
			onGetClients,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetAmounts({ id: id });
		}

		await onGetClients();
	}

	onSubmit = data => {
		const { onAddAmounts, onEditAmounts } = this.props;
		const { id } = this.state;

		if (id) {
			onEditAmounts(data, id);
		} else {
			onAddAmounts(data);
		}
	};

	getContract = id => {
		const { onGetContract } = this.props;
		onGetContract(id)
	}

	render() {
		const { id, columns } = this.state;
		const {
			amounts,
			loading,
			contracts,
			clients,
			months
		} = this.props;

		//CLIENT OPTIONS
		let clientOptions
		if (clients != false) {
			clientOptions = clients.map(index => ({ id: index.id, name: `${index.client} - UC ${index.unid_consumer} - DISTRIBUIDORA ${index.dist_name}` }))
		}
		//CONTRACT OPTIONS
		let contractOptions
		if (contracts != false) {
			contractOptions = contracts.map(index => ({ id: index.id_contract, name: index.contract_code}))
		}
		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Montantes"
				pathParent="/Montantes"
				breadcrumbs={[
					{
						name: id ? 'Editar Montantes' : 'Adicionar Montantes',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !amounts : loading}>
					<Form
						columns={columns}
						list={amounts[0]}
						months={months}
						getContract={id => this.getContract(id)}
						clientOptions={clientOptions || [0]}
						contractOptions={contractOptions || []}
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
		amounts: state.amounts.list,
		contracts: state.bond.list,
		clients: state.client.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetAmounts: id => dispatch(amountActions.getAmounts(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddAmounts: data => dispatch(amountActions.insertAmounts(data)),
		onEditAmounts: (data, id) => dispatch(amountActions.updateAmounts(data, id)),
		onGetContract: query => dispatch(bondContractClientActions.getBondContractClient(query)),
		onGetClients: query => dispatch(clientActions.getClient(query)),
	};
};

AmountsRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddAmounts: PropTypes.func.isRequired,
	onEditAmounts: PropTypes.func.isRequired,
	onGetAmounts: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AmountsRegisterPage);
