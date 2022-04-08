import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { merchantEnergyActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import MerchantList from '../../components/MerchantEnergy/MerchantEnergyList';

class MerchantEnergy extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveMerchant, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Comercializador',
					selector: 'merchant',
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
							route="merchant"
							handleNavigation={page => navigate(page)}
							changeValue={merchant => onActiveDesactiveMerchant(merchant)}
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
				title="Comercializador de energia"
				breadcrumbs={[{ name: 'Comercializador de energia', active: true }]}>
				<LoadingContent loading={false}>
					<MerchantList
					data={list || []}
					columns={columns}
					handleNavigation={page => navigate(page)}
					loadingFilter={loading}
					onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.merchant : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.merchant.list,
	loading: state.api.loading,
	select: state.merchant.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(merchantEnergyActions.getMerchantEnergy(query)),
	onSelect: query => dispatch(merchantEnergyActions.select(query)),
	onActiveDesactiveMerchant: query => dispatch(merchantEnergyActions.activeOrDesactiveMerch(query)),
	onDelete: query => dispatch(merchantEnergyActions.deleteOperatingMerch(query)),

});

MerchantEnergy.propTypes = {
	onActiveDesactiveGroup: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantEnergy);
