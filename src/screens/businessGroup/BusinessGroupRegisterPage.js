import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/BusinessGroup/BusinessGroupRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	businessGroupActions,
} from '../../store/actions';
import R from '../../lib/constants/R';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class BusinessGroupRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentDidMount() {
		const {
			onGetBusiness,
			match,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetBusiness({id: id});
		}
	}

	onSubmit = data => {
		const { onAddGroup, onEditGroup } = this.props;
		const { id } = this.state;

		if (id) {
			onEditGroup(data, id);
		} else {
			onAddGroup(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			business,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Grupo empresarial"
				pathParent="/Grupo empresarial"
				breadcrumbs={[
					{
						name: id ? 'Editar Grupo empresarial' : 'Adicionar Grupo empresarial',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !business : loading}>
					<Form
						list={business[0]}
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
		business: state.business.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetBusiness: id => dispatch(businessGroupActions.getBusinesGroup(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddGroup: data => dispatch(businessGroupActions.insertBusinessGroup(data)),
		onEditGroup: (data, id) => dispatch(businessGroupActions.updateBusinessGroup(data, id)),
	};
};

BusinessGroupRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddGroup: PropTypes.func.isRequired,
	onEditGroup: PropTypes.func.isRequired,
	onGetBusiness: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessGroupRegisterPage);
