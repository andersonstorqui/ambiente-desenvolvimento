import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';

const FormBond = ({
	clientLabel,
	clientInputProps,
	contractLabel,
	contractInputProps,
	dtIniLabel,
	dtIniInputsProps,
	dtEndLabel,
	dtEndInputsProps,
	activeLabel,
	activeInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	clientOptions,
	contractOptions,
	list,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: list,
	});

	const handleChange = (selectedOption, func, value) => {
		setValue(value, selectedOption.id);
		func({ selectedOption });
	};

	const [active, setActive] = useState({ selectedOption: {} })
	const [client, setClient] = useState({ selectedOption: {} });
	const [contract, setContract] = useState({ selectedOption: {} });
	const [dataIni, setDataIni] = useState();
	const [dataEnd, setDataEnd] = useState();

	//Setar campos caso edit
	React.useEffect(() => {
		let status
		if (list && list.active === false) {
			status = { id: false, name: 'Inativo' }
			handleChange(status, setActive, 'active')
		} else {
			status = { id: true, name: 'Ativo' }
			handleChange(status, setActive, 'active')
		}

		if (list && list.id_client) {
			handleChange({ id: list.id_client, name: `${list.name_client} - UC ${list.unid_consumer} - DISTRIBUIDORA ${list.dist}` }, setClient, 'id_client')
		}

		if (list && list.id_contract) {
			handleChange({ id: list.id_contract, name: list.contract_code }, setContract, 'id_contract')
		}
	}, [list])

	React.useEffect(() => {
		if (contract.selectedOption.data) {
			setDataIni(contract.selectedOption.data.dt_ini)
			setDataEnd(contract.selectedOption.data.dt_end)
		}
	}, [contract])

	React.useEffect(() => {
		register({ name: 'active' });
		register({ name: 'id_client' });
		register({ name: 'id_contract' });
	}, [register]);

	return (
		<Card title="Novo Vinculo">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={8} lg={12} md={12}>
						<SelectLabel
							label={clientLabel}
							{...clientInputProps}
							options={clientOptions}
							value={client.selectedOption}
							onChange={target => handleChange(target, setClient, 'id_client')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={contractLabel}
							{...contractInputProps}
							options={contractOptions}
							value={contract.selectedOption}
							onChange={target => handleChange(target, setContract, 'id_contract')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target.target.value, setActive, 'active')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							type="date"
							defaultValue={dataIni}
							label={dtIniLabel}
							{...dtIniInputsProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							type="date"
							defaultValue={dataEnd}
							label={dtEndLabel}
							{...dtEndInputsProps}
							innerRef={register}
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

FormBond.propTypes = {
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	contractLabel: PropTypes.string,
	contractInputProps: PropTypes.shape({}),
	dtIniLabel: PropTypes.string,
	dtIniInputsProps: PropTypes.shape({}),
	dtEndLabel: PropTypes.string,
	dtEndInputsProps: PropTypes.shape({}),
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormBond.defaultProps = {
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'client',
		id: 'client',
		placeholder: 'Cliente',
		required: true,
	},
	contractLabel: 'Contrato',
	contractInputProps: {
		name: 'contract',
		id: 'contract',
		placeholder: 'Contrato',
		required: true,
	},
	dtIniLabel: 'Início',
	dtIniInputsProps: {
		name: 'dt_ini',
		id: 'dt_ini',
	},
	dtEndLabel: 'Fim',
	dtEndInputsProps: {
		name: 'dt_end',
		id: 'dt_end',
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormBond;
