import PropTypes from 'prop-types';
import React from 'react';
import { Fab } from 'react-tiny-fab';
import { MdAdd } from 'react-icons/md';
import Filter from './Filter';
import DataTable from '../../Utils/DataTable';
import R from '../../../lib/constants/R';

class BondList extends React.Component {
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
			client
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
					client={client}
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
					onClick={() => handleNavigation('/bond/add')}
					text="Adicionar vinculo"
				/>
			</div>
		);
	}
}

BondList.propTypes = {
	handleNavigation: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSubmitFilter: PropTypes.func.isRequired,
	cleanFilter: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
	loadingFilter: PropTypes.bool.isRequired,
};

BondList.defaultProps = {};

export default BondList;
