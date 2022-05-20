import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { pricesActions, clientActions, contractsActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import PricesList from '../../components/Prices/PricesList';
import {numberToPrice} from '../../lib/utils/functions';

class PricesPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactivePrice, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '15%',
				},
				{
					name: 'Cliente',
					selector: 'cliente_name',
					sortable: true,
					width: '20%',
				},
				{
					name: 'Contrato',
					selector: 'cod_contract_number',
					sortable: true,
					width: '20%',
				},
				{
					name: 'Preço Base',
					selector: 'price_base',
					cell: row => row.price_base ? numberToPrice(row.price_base) : null,
					sortable: true,
					width: '15%',
				},
				{
					name: 'Preço Reajuste',
					selector: 'price_reajust',
					cell: row => row.price_reajust ? numberToPrice(row.price_reajust) : null,
					sortable: true,
					width: '15%',
				},
				{
					name: 'Ações',
					selector: 'active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							onSelect={value => onSelect(value)}
							route="prices"
							handleNavigation={page => navigate(page)}
							changeValue={prices => onActiveDesactivePrice(prices)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetList, onGetClient, onGetContracts } = this.props;

		await onGetClient();
		await onGetContracts({ active: true });

		await onGetList('active=true');
	}

	render() {
		const {
			list,
			loading,
			onGetList,
			onDelete,
			select,
			client,
			contracts
		} = this.props;
		const { columns } = this.state;

		//CLIENTES
		let clientOptions
		if (client != false) {
			clientOptions = client.map(index => ({ id: index.id, name: index.client }))
		}

		//CONTRACTS
		let contractsOptions
		if (contracts != false) {
			contractsOptions = contracts.map(index => ({ id: index.id, name: index.contracts_cod }))
		}

		return (
			<Page
				className="users"
				title="Preços"
				breadcrumbs={[{ name: 'Preços', active: true }]}>
				<LoadingContent loading={false}>
					<PricesList
					data={list || []}
					columns={columns}
					clientOptions={clientOptions}
					contractsOptions={contractsOptions}
					handleNavigation={page => navigate(page)}
					loadingFilter={loading}
					onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.prices : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.prices.list,
	loading: state.api.loading,
	select: state.prices.select,
	contracts: state.contracts.list,
	client: state.client.list,
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(pricesActions.getPrices(query)),
	onSelect: query => dispatch(pricesActions.select(query)),
	onActiveDesactivePrice: query => dispatch(pricesActions.activeOrDesactivePrices(query)),
	onDelete: query => dispatch(pricesActions.deletePrices(query)),
	onGetClient: id => dispatch(clientActions.getClient(id)),
	onGetContracts: id => dispatch(contractsActions.getContracts(id)),
});

PricesPage.propTypes = {
	onActiveDesactivePrice: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PricesPage);
