import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/MerchantEnergy/MerchantEnergyRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	merchantEnergyActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class MerchantEnergyRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetList,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetList({id: id});
		}
	}

	onSubmit = data => {
		const { onAddMerchant, onEditMerchant } = this.props;
		const { id } = this.state;

		if (id) {
			onEditMerchant(data, id);
		} else {
			onAddMerchant(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			merchant,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Comercializador de energia"
				pathParent="/Comercializador de energia"
				breadcrumbs={[
					{
						name: id ? 'Editar Comercializador de energia' : 'Adicionar Comercializador de energia',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !merchant : loading}>
					<Form
						list={merchant[0]}
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
		merchant: state.merchant.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetList: id => dispatch(merchantEnergyActions.getMerchantEnergy(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddMerchant: data => dispatch(merchantEnergyActions.insertMerchantEnergy(data)),
		onEditMerchant: (data, id) => dispatch(merchantEnergyActions.updateMerchantEnergy(data, id)),
	};
};

MerchantEnergyRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddMerchant: PropTypes.func.isRequired,
	onEditMerchant: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEnergyRegisterPage);
