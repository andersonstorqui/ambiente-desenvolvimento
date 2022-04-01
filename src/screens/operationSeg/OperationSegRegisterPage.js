import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/OperationSeg/OperationSegRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	notificationActions,
	operationSegActions,
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import PropTypes from '../../lib/utils/propTypes';

class OperationSegRegisterPage extends React.Component {
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
			await onGetList(id);
		}
	}

	onSubmit = data => {
		const { onAddSegment, onEditSegment } = this.props;
		const { id } = this.state;

		if (id) {
			onEditSegment(data, id);
		} else {
			onAddSegment(data);
		}
	};

	render() {
		const { id } = this.state;

		const {
			segment,
			loading,
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Segmento de atuação"
				pathParent="/Segmento de atuação"
				breadcrumbs={[
					{
						name: id ? 'Editar Segmento de atuação' : 'Adicionar Segmento de atuação',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !segment : loading}>
					<Form
						list={segment[0]}
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
		segment: state.segment.list,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetList: id => dispatch(operationSegActions.getOperationSeg(id)),
		onAddNotification: (message, level) =>
			dispatch(notificationActions.addNotification(message, level)),
		onAddSegment: data => dispatch(operationSegActions.insertOperationSeg(data)),
		onEditSegment: (data, id) => dispatch(operationSegActions.updateOperationSeg(data, id)),
	};
};

OperationSegRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddGroup: PropTypes.func.isRequired,
	onEditGroup: PropTypes.func.isRequired,
	onGetBusiness: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationSegRegisterPage);
