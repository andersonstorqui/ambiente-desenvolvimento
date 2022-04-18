import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/contracts/ContractsRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	contractsActions,
	energyTypeActions,
	modulationActions,
	merchantEnergyActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class ContractsRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetContracts,
			onGetEnergyType,
			onGetMerchant,
			onGetModulation,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		await onGetEnergyType({ active: true });
		await onGetMerchant({ active: true });
		await onGetModulation({ active: true });

		if (id) {
			await onGetContracts({id: id});
		}
	}

	onSubmit = data => {
		const { onAddContracts, onEditContracts } = this.props;
		const { id } = this.state;

		if (id) {
			onEditContracts(data, id);
		} else {
			onAddContracts(data);
		}
	};


	render() {
		const { id } = this.state;

		const {
			contracts,
			loading,
			merchant,
			energy,
			modulation
		} = this.props;

		//OPTIONS Merchant
		let merchantOptions
		if (merchant != false) {
			merchantOptions = merchant.map(index => ({ id: index.id, name: index.merchant }))
		}
		//OPTIONS energy
		let energyOptions
		if (energy != false) {
			energyOptions = energy.map(index => ({ id: index.id, name: index.type }))
		}
		//OPTIONS modulation
		let modulationOptions
		if (modulation != false) {
			modulationOptions = modulation.map(index => ({ id: index.id, name: index.modulation }))
		}

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Contrato"
				pathParent="/Contrato"
				breadcrumbs={[
					{
						name: id ? 'Editar Contrato' : 'Adicionar Contrato',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !contracts : loading}>
					<Form
						list={contracts[0]}
						energyOptions={energyOptions || []}
						modulationOptions={modulationOptions || []}
						merchantOptions={merchantOptions || []}
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
		contracts: state.contracts.list,
		energy: state.energy.list,
		modulation: state.modulation.list,
		merchant: state.merchant.list
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetContracts: id => dispatch(contractsActions.getContracts(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddContracts: data => dispatch(contractsActions.insertContracts(data)),
		onEditContracts: (data, id) => dispatch(contractsActions.updateContracts(data, id)),
		onGetEnergyType: query => dispatch(energyTypeActions.getEnergyType(query)),
		onGetModulation: query => dispatch(modulationActions.getModulation(query)),
		onGetMerchant: query => dispatch(merchantEnergyActions.getMerchantEnergy(query)),
	};
};

ContractsRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onGetEnergyType: PropTypes.func.isRequired,
	onGetMerchant: PropTypes.func.isRequired,
	onGetModulation: PropTypes.func.isRequired,
	onAddContracts: PropTypes.func.isRequired,
	onGetDist: PropTypes.func.isRequired,
	onEditContracts: PropTypes.func.isRequired,
	onGetContracts: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsRegisterPage);
