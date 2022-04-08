import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Modulation/ModulationRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	modulationActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class ModulationRegisterPage extends React.Component {
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
		const { onAddModulation, onEditModulation } = this.props;
		const { id } = this.state;

		if (id) {
			onEditModulation(data, id);
		} else {
			onAddModulation(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			modulation,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Modulação"
				pathParent="/Modulação"
				breadcrumbs={[
					{
						name: id ? 'Editar Modulação' : 'Adicionar Modulação',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !modulation : loading}>
					<Form
						list={modulation[0]}
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
		modulation: state.modulation.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetList: id => dispatch(modulationActions.getModulation(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddModulation: data => dispatch(modulationActions.insertModulation(data)),
		onEditModulation: (data, id) => dispatch(modulationActions.updateModulation(data, id)),
	};
};

ModulationRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddModulation: PropTypes.func.isRequired,
	onEditModulation: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModulationRegisterPage);
