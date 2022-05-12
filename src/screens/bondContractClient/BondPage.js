import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, bondContractClientActions, clientActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import BondList from '../../components/BondContractsClient/BondContractsClientList';

class BondGroup extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveBond, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Cliente',
					selector: 'name_client',
					sortable: true,
					width: '20%',
				},
				{
					name: 'UC',
					selector: 'unid_consumer',
					sortable: true,
					width: '20%',
				},
				{
					name: 'Distribuidora',
					selector: 'dist',
					sortable: true,
					width: '15%',
				},
				{
					name: 'Contrato',
					selector: 'contract_code',
					sortable: true,
					width: '20%',
				},
				{
					name: 'Ações',
					selector: 'active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							onSelect={value => onSelect(value)}
							route="bond"
							handleNavigation={page => navigate(page)}
							changeValue={bond => onActiveDesactiveBond(bond)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetList, onGetClient } = this.props;
		await onGetList('active=true');
		await onGetClient('active=true');
	}

	render() {
		const {
			list,
			loading,
			onGetList,
			onDelete,
			client,
			select
		} = this.props;
		const { columns } = this.state;

		//CLIENT OPTIONS
		let clientOptions
		if (client != false) {
			clientOptions = client.map(index => ({ id: index.id, name: index.client }))
		}

		return (
			<Page
				className="users"
				title="Vínculos contratos e clientes"
				breadcrumbs={[{ name: 'Vínculos contratos e clientes', active: true }]}>
				<LoadingContent loading={false}>
					<BondList
						data={list || []}
						client={clientOptions || []}
						columns={columns}
						handleNavigation={page => navigate(page)}
						loadingFilter={loading}
						onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.bond : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.bond.list,
	loading: state.api.loading,
	select: state.bond.select,
	client: state.client.list,
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(bondContractClientActions.getBondContractClient(query)),
	onSelect: query => dispatch(bondContractClientActions.select(query)),
	onActiveDesactiveBond: query => dispatch(bondContractClientActions.activeOrDesactiveBondContractClient(query)),
	onDelete: query => dispatch(bondContractClientActions.deleteBondContractClient(query)),
	onGetClient: query => dispatch(clientActions.getClient(query))
});

BondGroup.propTypes = {
	onActiveDesactiveBond: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BondGroup);
