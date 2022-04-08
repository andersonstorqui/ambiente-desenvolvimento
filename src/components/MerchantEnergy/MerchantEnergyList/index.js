import PropTypes from 'prop-types';
import React from 'react';
import { Fab } from 'react-tiny-fab';
import { MdAdd } from 'react-icons/md';
import Filter from './Filter';
import DataTable from '../../Utils/DataTable';

class MerchantEnergyList extends React.Component {
	constructor(props) {
		super(props);

		this.state = { resetPaginationToggle: false };
	}

	render() {
		const {
			data,
			columns,
			handleNavigation,
			onSubmitFilter,
			cleanFilter,
			loadingFilter,
			companies,
		} = this.props;

		const { resetPaginationToggle } = this.state;

		return (
			<div>
				<Filter
					onSubmit={values => {
						onSubmitFilter(values);
						this.setState({
							resetPaginationToggle: !resetPaginationToggle,
						});
					}}
					clearQuery={() => cleanFilter()}
					companies={companies}
				/>
				<DataTable
					loading={loadingFilter}
					columns={columns}
					data={data}
					paginationResetDefaultPage={resetPaginationToggle}
					pagination={data.length > 10}
				/>
				<Fab
					mainButtonStyles={{
						backgroundColor: '#FF6F00',
					}}
					position={{ bottom: 15, right: 0 }}
					event="click"
					icon={<MdAdd />}
					onClick={() => handleNavigation('/merchant/add')}
					text="Adicionar Comerciante de energia"
				/>
			</div>
		);
	}
}

MerchantEnergyList.propTypes = {
	handleNavigation: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSubmitFilter: PropTypes.func.isRequired,
	cleanFilter: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
	loadingFilter: PropTypes.bool.isRequired,
};

MerchantEnergyList.defaultProps = {};

export default MerchantEnergyList;
