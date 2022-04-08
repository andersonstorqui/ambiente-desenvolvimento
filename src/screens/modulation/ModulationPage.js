import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '../../lib/utils/navigation';
import { modulationActions } from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import PropTypes from '../../lib/utils/propTypes';
import ModulationList from '../../components/Modulation/ModulationList';

class ModulationPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveModulation, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Modulação',
					selector: 'modulation',
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
							route="modulation"
							handleNavigation={page => navigate(page)}
							changeValue={modulation => onActiveDesactiveModulation(modulation)}
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
				title="Modulação"
				breadcrumbs={[{ name: 'Modulação', active: true }]}>
				<LoadingContent loading={false}>
					<ModulationList
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
	list: state.modulation.list,
	loading: state.api.loading,
	select: state.modulation.select
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(modulationActions.getModulation(query)),
	onSelect: query => dispatch(modulationActions.select(query)),
	onActiveDesactiveModulation: query => dispatch(modulationActions.activeOrDesactiveModulation(query)),
	onDelete: query => dispatch(modulationActions.deleteOperatingModulation(query)),

});

ModulationPage.propTypes = {
	onActiveDesactiveModulation: PropTypes.func.isRequired,
	onGetList: PropTypes.func.isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModulationPage);
