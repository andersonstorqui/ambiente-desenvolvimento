import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { apiActions, amountActions, clientActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import AmountsList from '../../components/Amounts/AmountsList';

class AmountsGroup extends React.Component {
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
					selector: 'client_name',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Contrato',
					selector: 'contract_code',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ano',
					selector: 'year',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							onSelect={value => onSelect(value)}
							route="amounts"
							handleNavigation={page => navigate(page)}
							changeValue={amounts => onActiveDesactiveBond(amounts)}
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
				title="Montantes"
				breadcrumbs={[{ name: 'Montantes', active: true }]}>
				<LoadingContent loading={false}>
					<AmountsList
						data={list || []}
						columns={columns}
						client={clientOptions || []}
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
	list: state.amounts.list,
	loading: state.api.loading,
	select: state.amounts.select,
	client: state.client.list,
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(amountActions.getAmounts(query)),
	onSelect: query => dispatch(amountActions.select(query)),
	onActiveDesactiveBond: query => dispatch(amountActions.activeOrDesactiveAmounts(query)),
	onDelete: query => dispatch(amountActions.deleteAmounts(query)),
	onGetClient: query => dispatch(clientActions.getClient(query))
});

AmountsGroup.propTypes = {
	onActiveDesactiveBond: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AmountsGroup);
