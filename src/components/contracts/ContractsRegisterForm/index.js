import React, { useState } from 'react';
import { Button, Col, Row, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import { statusMonitoramento, categoriaClient, subMercado } from '../../../lib/utils/selects';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel, SelectAsyncLabel, DatePicker, Checkbox } from '../../Utils';
import bancos from '../../../lib/utils/bancos.json';

const FormContracts = ({
	activeLabel,
	activeInputProps,
	list,
	onSubmit,
	handleNavigation,
	btnLabelCancel,
	btnLabelSubmit,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: list,
	});

	//functions
	const handleChange = (selectedOption, func, value) => {
		setValue(value, selectedOption.id);
		func({ selectedOption });
	};

	//VARS
	const [active, setActive] = useState({ selectedOption: {} });
	

	

	React.useEffect(() => {
		register({ name: 'active' });
		
	}, [register]);

	return (
		<Card title="Novo contrato">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target, setActive, 'active')}
						/>
					</Col>
				</Row>
				<Button
					color="danger"
					outline
					className="float-left col-md-2 mt-3"
					onClick={() => handleNavigation()}>
					{btnLabelCancel}
				</Button>
				<Button
					color="success"
					outline
					type="submit"
					className="float-right col-md-2 mt-3">
					{btnLabelSubmit}
				</Button>
			</form>
		</Card>
	);
};

FormContracts.propTypes = {
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormContracts.defaultProps = {
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormContracts;
