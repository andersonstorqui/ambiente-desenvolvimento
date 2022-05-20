import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';
import DataTable from '../../Utils/DataTable';

const FormAmounts = ({
	clientLabel,
	clientInputProps,
	contractLabel,
	contractInputProps,
	yearLabel,
	yearInputProps,
	yearMediaLabel,
	yearMediaInputProps,
	janeiroLabel,
	janeiroInputProps,
	fevereiroLabel,
	fevereiroInputProps,
	marcoLabel,
	marcoInputProps,
	abrilLabel,
	abrilInputProps,
	maioLabel,
	maioInputProps,
	junhoLabel,
	junhoInputProps,
	julhoLabel,
	julhoInputProps,
	agostoLabel,
	agostoInputProps,
	setembroLabel,
	setembroInputProps,
	outubroLabel,
	outubroInputProps,
	novembroLabel,
	novembroInputProps,
	dezembroLabel,
	dezembroInputProps,
	activeLabel,
	activeInputProps,
	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	getContract,
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
		if (value == 'client') {
			getContract({ client: selectedOption.id })
		}
	};

	const [active, setActive] = useState({ selectedOption: {} })
	const [client, setClient] = useState({ selectedOption: {} });
	const [contract, setContract] = useState({ selectedOption: {} });

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

		if (list && list.client) {
			handleChange({ id: list.client, name: `${list.client_name}` }, setClient, 'client')
		}

		if (list && list.contract) {
			handleChange({ id: list.contract, name: list.contract_code }, setContract, 'contract')
		}
	}, [list])

	React.useEffect(() => {
		register({ name: 'active' });
		register({ name: 'client' });
		register({ name: 'contract' });
	}, [register]);

	return (
		<Card title="Novo Montante">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={8} lg={12} md={12}>
						<SelectLabel
							label={clientLabel}
							{...clientInputProps}
							options={clientOptions}
							value={client.selectedOption}
							onChange={target => handleChange(target, setClient, 'client')}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={contractLabel}
							{...contractInputProps}
							options={contractOptions}
							value={contract.selectedOption}
							onChange={target => handleChange(target, setContract, 'contract')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={yearLabel}
							{...yearInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<InputLabel
							label={yearMediaLabel}
							{...yearMediaInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target.target.value, setActive, 'active')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={janeiroLabel}
							{...janeiroInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={fevereiroLabel}
							{...fevereiroInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={marcoLabel}
							{...marcoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={abrilLabel}
							{...abrilInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={maioLabel}
							{...maioInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={junhoLabel}
							{...junhoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={julhoLabel}
							{...julhoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={agostoLabel}
							{...agostoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={setembroLabel}
							{...setembroInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={outubroLabel}
							{...outubroInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={novembroLabel}
							{...novembroInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={2} lg={2} md={2}>
						<InputLabel
							label={dezembroLabel}
							{...dezembroInputProps}
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

FormAmounts.propTypes = {
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

FormAmounts.defaultProps = {
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
	yearLabel: 'Ano',
	yearInputProps: {
		name: 'year',
		id: 'year',
		placeholder: 'AAAA',
		required: true,
	},
	yearMediaLabel: 'Média do Ano',
	yearMediaInputProps: {
		name: 'year_media',
		id: 'year_media',
		placeholder: 'Média do Ano',
		required: true,
	},
	janeiroLabel: 'Janeiro',
	janeiroInputProps: {
		name: 'janeiro',
		id: 'janeiro',
		placeholder: 'Janeiro',
	},
	fevereiroLabel: 'Fevereiro',
	fevereiroInputProps: {
		name: 'fevereiro',
		id: 'fevereiro',
		placeholder: 'Fevereiro',
	},	
	marcoLabel: 'Março',
	marcoInputProps: {
		name: 'marco',
		id: 'marco',
		placeholder: 'Março',
	},
	abrilLabel: 'Abril',
	abrilInputProps: {
		name: 'abril',
		id: 'abril',
		placeholder: 'Abril',
	},
	maioLabel: 'Maio',
	maioInputProps: {
		name: 'maio',
		id: 'maio',
		placeholder: 'Maio',
	},
	junhoLabel: 'Junho',
	junhoInputProps: {
		name: 'junho',
		id: 'junho',
		placeholder: 'Junho',
	},
	julhoLabel: 'Julho',
	julhoInputProps: {
		name: 'julho',
		id: 'julho',
		placeholder: 'Julho',
	},
	agostoLabel: 'Agosto',
	agostoInputProps: {
		name: 'agosto',
		id: 'agosto',
		placeholder: 'Agosto',
	},
	setembroLabel: 'Setembro',
	setembroInputProps: {
		name: 'setembro',
		id: 'setembro',
		placeholder: 'Setembro',
	},
	outubroLabel: 'Outubro',
	outubroInputProps: {
		name: 'outubro',
		id: 'outubro',
		placeholder: 'Outubro',
	},
	novembroLabel: 'Novembro',
	novembroInputProps: {
		name: 'novembro',
		id: 'novembro',
		placeholder: 'Novembro',
	},
	dezembroLabel: 'Dezembro',
	dezembroInputProps: {
		name: 'dezembro',
		id: 'dezembro',
		placeholder: 'Dezembro',
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormAmounts;
