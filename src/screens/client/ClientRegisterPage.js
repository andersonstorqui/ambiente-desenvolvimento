import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Client/ClientRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	clientActions,
	businessGroupActions,
	distActions,
	usersActions,
	operationSegActions,
	genericsActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class ClientRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetClient,
			onGetGroups,
			onGetDist,
			onGetSegment,
			onGetListUsers,
			onGetStates,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});
		await onGetStates();
		await onGetGroups({ active: true });
		await onGetDist({ active: true });
		await onGetSegment({ active: true });
		await onGetListUsers();
		if (id) {
			await onGetClient({id: id});
		}
	}

	onSubmit = data => {
		const { onAddClient, onEditClient } = this.props;
		const { id } = this.state;

		if (id) {
			onEditClient(data, id);
		} else {
			onAddClient(data);
		}
	};

	getCity = id => {
		const { onGetCity } = this.props;
		onGetCity(id)
	}

	render() {
		const { id } = this.state;

		const {
			client,
			groups,
			loading,
			dist,
			segment,
			states,
			city,
			user
		} = this.props;

		//OPTIONS GROUP
		let groupsOptions
		if (groups != false) {
			groupsOptions = groups.map(index => ({ id: index.id, name: index.group }))
		}
		//OPTIONS DIST
		let distOptions
		if (dist != false) {
			distOptions = dist.map(index => ({ id: index.id, name: index.dist }))
		}
		//OPTIONS SEGMENT
		let segmentOptions
		if (segment != false) {
			segmentOptions = segment.map(index => ({ id: index.id, name: index.segment }))
		}
		//USER
		let userOptions
		if (user != false) {
			userOptions = user.map(index => ({ id: index.id, name: `${index.first_name} ${index.last_name}` }))
		}


		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Cliente"
				pathParent="/Cliente"
				breadcrumbs={[
					{
						name: id ? 'Editar Cliente' : 'Adicionar Cliente',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !client || !states || !userOptions : loading}>
					<Form
						list={client[0]}
						groups={groupsOptions || []}
						dist={distOptions || []}
						segment={segmentOptions || []}
						user={userOptions || []}
						state={states || []}
						city={city || []}
						getCity={id => this.getCity(id)}
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
		client: state.client.list,
		groups: state.business.list,
		dist: state.dist.list,
		segment: state.segment.list,
		user: state.user.list,
		states: state.generics.state,
		city: state.generics.city
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetClient: id => dispatch(clientActions.getClient(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddClient: data => dispatch(clientActions.insertClient(data)),
		onEditClient: (data, id) => dispatch(clientActions.updateClient(data, id)),
		onGetGroups: query => dispatch(businessGroupActions.getBusinesGroup(query)),
		onGetDist: query => dispatch(distActions.getDist(query)),
		onGetSegment: query => dispatch(operationSegActions.getOperationSeg(query)),
		onGetListUsers: query => dispatch(usersActions.getListUsers(query)),
		onGetStates: () => dispatch(genericsActions.getState()),
		onGetCity: id => dispatch(genericsActions.getCity(id)),

	};
};

ClientRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddClient: PropTypes.func.isRequired,
	onGetDist: PropTypes.func.isRequired,
	onGetSegment: PropTypes.func.isRequired,
	onGetListUsers: PropTypes.func.isRequired,
	onEditClient: PropTypes.func.isRequired,
	onGetClient: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegisterPage);
