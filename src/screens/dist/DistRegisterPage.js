import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/dist/DistRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	distActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class DistRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetDist,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetDist(id);
		}
	}

	onSubmit = data => {
		const { onAddDist, onEditDist } = this.props;
		const { id } = this.state;

		if (id) {
			onEditDist(data, id);
		} else {
			onAddDist(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			dist,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Distribuidora"
				pathParent="/Distribuidora"
				breadcrumbs={[
					{
						name: id ? 'Editar Distribuidora' : 'Adicionar Distribuidora',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !dist : loading}>
					<Form
						list={dist[0]}
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
		dist: state.dist.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetDist: id => dispatch(distActions.getDist(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddDist: data => dispatch(distActions.insertDist(data)),
		onEditDist: (data, id) => dispatch(distActions.updateDist(data, id)),
	};
};

DistRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddGroup: PropTypes.func.isRequired,
	onEditGroup: PropTypes.func.isRequired,
	onGetBusiness: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DistRegisterPage);
