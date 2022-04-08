import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { energyTypeActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import EnergyList from '../../components/EnergyTypes/EnergyTypeList';

class EnergyTypePage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveType, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Descrição',
					selector: 'type',
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
							route="energy-types"
							handleNavigation={page => navigate(page)}
							changeValue={type => onActiveDesactiveType(type)}
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
				title="Tipo de energia"
				breadcrumbs={[{ name: 'Tipo de energia', active: true }]}>
				<LoadingContent loading={false}>
					<EnergyList
					data={list || []}
					columns={columns}
					handleNavigation={page => navigate(page)}
					loadingFilter={loading}
					onSubmitFilter={data => onGetList(data)}
					/>
					<ModalDelete
						name={select ? select.modulation : ''}
						onSubmit={() => onDelete(select.id)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	list: state.energy.list,
	loading: state.api.loading,
	select: state.energy.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(energyTypeActions.getEnergyType(query)),
	onSelect: query => dispatch(energyTypeActions.select(query)),
	onActiveDesactiveType: query => dispatch(energyTypeActions.activeOrDesactiveTypes(query)),
	onDelete: query => dispatch(energyTypeActions.deleteEnergyType(query)),

});

EnergyTypePage.propTypes = {
	onActiveDesactiveType: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EnergyTypePage);
