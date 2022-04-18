import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { contractsActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import ContractsList from '../../components/contracts/ContractsList';

class ContractsPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveContract, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Contrato',
					selector: 'contracts_cod',
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
							route="contracts"
							handleNavigation={page => navigate(page)}
							changeValue={contracts => onActiveDesactiveContract(contracts)}
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
				title="Contratos"
				breadcrumbs={[{ name: 'Contratos', active: true }]}>
				<LoadingContent loading={false}>
					<ContractsList
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
	list: state.contracts.list,
	loading: state.api.loading,
	select: state.contracts.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(contractsActions.getContracts(query)),
	onSelect: query => dispatch(contractsActions.select(query)),
	onActiveDesactiveContract: query => dispatch(contractsActions.activeOrDesactiveContracts(query)),
	onDelete: query => dispatch(contractsActions.deleteContracts(query)),

});

ContractsPage.propTypes = {
	onActiveDesactiveContract: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractsPage);
