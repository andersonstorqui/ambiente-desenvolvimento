import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, businessGroupActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import BusinessList from '../../components/BusinessGroup/BusinessGroupList';
import queryString from 'query-string';

class BussinesGroup extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveGroup, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Grupo',
					selector: 'group',
					sortable: true,
					width: '75%',
				},
				{
					name: 'Ações',
					selector: 'active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							onSelect={value => onSelect(value)}
							route="business-group"
							handleNavigation={page => navigate(page)}
							changeValue={group => onActiveDesactiveGroup(group)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetList } = this.props;
		await onGetList('active=true');
	}

	render() {
		const {
			list,
			loading,
			onGetList,
			onDelete,
			select
		} = this.props;
		const { columns } = this.state;

		console.log('teste')
		return (
			<Page
				className="users"
				title="Grupo empresarial"
				breadcrumbs={[{ name: 'Grupo empresarial', active: true }]}>
				<LoadingContent loading={false}>
					<BusinessList
					data={list || []}
					columns={columns}
					handleNavigation={page => navigate(page)}
					loadingFilter={loading}
					onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.group : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.business.list,
	loading: state.api.loading,
	select: state.business.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(businessGroupActions.getBusinesGroup(query)),
	onSelect: query => dispatch(businessGroupActions.select(query)),
	onActiveDesactiveGroup: query => dispatch(businessGroupActions.activeOrDesactiveBusinessGroup(query)),
	onDelete: query => dispatch(businessGroupActions.deleteBusinessGroup(query)),

});

BussinesGroup.propTypes = {
	onActiveDesactiveGroup: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BussinesGroup);
