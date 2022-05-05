import React, { useState } from 'react';
import { Button, Col, Row, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';

const FormPrices = ({
	activeLabel,
	activeInputProps,
	clientLabel,
	clientInputProps,
	contractLabel,
	contractInputProps,
	anoLabel,
	anoInputProps,
	dateReajustLabel,
	dateReajustInputProps,
	priceBaseLabel,
	priceBaseInputProps,
	priceReajustLabel,
	priceReajustInputProps,
	list,
	client,
	contracts,
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
	const [clientPerfil, setClientPerfil] = useState({ selectedOption: {} });
	const [contractCode, setContractCode] = useState({ selectedOption: {} });

	React.useEffect(() => {
		//status
		let status
		if (list && list.active === false) {
			status = { id: false, name: 'Inativo' }
			handleChange(status, setActive, 'active')
		} else {
			status = { id: true, name: 'Ativo' }
			handleChange(status, setActive, 'active')
		}
		//clientes
		let clientes
		if (list && list.cliente) {
			clientes = client.filter(cliente => cliente.id == list.cliente)[0]
			handleChange(client, setClientPerfil, 'cliente')
		}
		//contrato
		let contratos
		if (list && list.cod_contract) {
			contratos = contracts.filter(contracts => contracts.id)[0]
			handleChange(contratos, setContractCode, 'cod_contract')
		}
	}, [list])


	React.useEffect(() => {
		register({ name: 'active' });
		register({ name: 'cliente' });
		register({ name: 'cod_contract' });
	}, [register]);

	return (
		<Card title="Novo preços">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target, setActive, 'active')}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={clientLabel}
							{...clientInputProps}
							options={client}
							value={clientPerfil.selectedOption}
							onChange={target => handleChange(target, setClientPerfil, 'cliente')}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={contractLabel}
							{...contractInputProps}
							options={contracts}
							value={contractCode.selectedOption}
							onChange={target => handleChange(target, setContractCode, 'cod_contract')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={anoLabel}
							{...anoInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							type='date'
							label={dateReajustLabel}
							{...dateReajustInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={priceBaseLabel}
							{...priceBaseInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={priceReajustLabel}
							{...priceReajustInputProps}
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

FormPrices.propTypes = {
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	contractLabel: PropTypes.string,
	contractInputProps: PropTypes.shape({}),
	anoLabel: PropTypes.string,
	anoInputProps: PropTypes.shape({}),
	dateReajustLabel: PropTypes.string,
	dateReajustInputProps: PropTypes.shape({}),
	priceBaseLabel: PropTypes.string,
	priceBaseInputProps: PropTypes.shape({}),
	priceReajustLabel: PropTypes.string,
	priceReajustInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormPrices.defaultProps = {
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'cliente',
		id: 'cliente',
	},
	contractLabel: 'Código Contrato',
	contractInputProps: {
		name: 'cod_contract',
		id: 'cod_contract',
	},
	anoLabel: 'Ano',
	anoInputProps: {
		name: 'ano',
		id: 'ano',
	},
	dateReajustLabel: 'Data reajuste',
	dateReajustInputProps: {
		name: 'dt_reajuste',
		id: 'dt_reajuste',
	},
	priceBaseLabel: 'Preço Base',
	priceBaseInputProps: {
		name: 'price_base',
		id: 'price_base',
	},
	priceReajustLabel: 'Preço Reajuste',
	priceReajustInputProps: {
		name: 'price_reajust',
		id: 'price_reajust',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormPrices;
