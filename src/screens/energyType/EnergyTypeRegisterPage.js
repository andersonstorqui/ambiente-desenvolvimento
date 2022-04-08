import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/EnergyTypes/EnergyTypeRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	energyTypeActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class EnergyTypeRegisterPage extends React.Component {
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
		const { onAddType, onEditType } = this.props;
		const { id } = this.state;

		if (id) {
			onEditType(data, id);
		} else {
			onAddType(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			types,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Tipo de energia"
				pathParent="/Tipo de energia"
				breadcrumbs={[
					{
						name: id ? 'Editar Tipo de energia' : 'Adicionar Tipo de energia',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !types : loading}>
					<Form
						list={types[0]}
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
		types: state.energy.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetList: id => dispatch(energyTypeActions.getEnergyType(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddType: data => dispatch(energyTypeActions.insertEnergyType(data)),
		onEditType: (data, id) => dispatch(energyTypeActions.updateEnergyType(data, id)),
	};
};

EnergyTypeRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddType: PropTypes.func.isRequired,
	onEditType: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnergyTypeRegisterPage);
