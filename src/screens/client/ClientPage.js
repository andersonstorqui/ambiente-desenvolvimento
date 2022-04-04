import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { clientActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import ClientList from '../../components/Client/ClientList';

class ClientPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveClient, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Distribuidora',
					selector: 'dist',
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
							route="dist"
							handleNavigation={page => navigate(page)}
							changeValue={group => onActiveDesactiveClient(group)}
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
		return (
			<Page
				className="users"
				title="Cliente"
				breadcrumbs={[{ name: 'Cliente', active: true }]}>
				<LoadingContent loading={false}>
					<ClientList
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
	list: state.client.list,
	loading: state.api.loading,
	select: state.client.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(clientActions.getClient(query)),
	onSelect: query => dispatch(clientActions.select(query)),
	onActiveDesactiveClient: query => dispatch(clientActions.activeOrDesactiveClient(query)),
	onDelete: query => dispatch(clientActions.deleteClient(query)),

});

ClientPage.propTypes = {
	onActiveDesactiveClient: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
