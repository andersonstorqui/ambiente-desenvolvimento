import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/contracts/ContractsRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	contractsActions,
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
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

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
			loading
		} = this.props;

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
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetContracts: id => dispatch(contractsActions.getContracts(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddContracts: data => dispatch(contractsActions.insertContracts(data)),
		onEditContracts: (data, id) => dispatch(contractsActions.updateContracts(data, id)),

	};
};

ContractsRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
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
