import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { distActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import DistList from '../../components/dist/DistList/';

class DistPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveDist, onSelect } = this.props;

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
							changeValue={group => onActiveDesactiveDist(group)}
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
				title="Distribuidora"
				breadcrumbs={[{ name: 'Distribuidora', active: true }]}>
				<LoadingContent loading={false}>
					<DistList
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
	list: state.dist.list,
	loading: state.api.loading,
	select: state.dist.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(distActions.getDist(query)),
	onSelect: query => dispatch(distActions.select(query)),
	onActiveDesactiveDist: query => dispatch(distActions.activeOrDesactiveDist(query)),
	onDelete: query => dispatch(distActions.deleteDist(query)),

});

DistPage.propTypes = {
	onActiveDesactiveDist: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DistPage);
