import React, { useState } from 'react';
import { Button, Col, Row, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel } from '../../Utils';
import { meses } from '../../../lib/utils/selects';

const FormContracts = ({
	activeLabel,
	activeInputProps,
	contractCodLabel,
	contractCodInputProps,
	contrPartLabel,
	contrPartInputProps,
	complementarLabel,
	complementarInputProps,
	dtIniLabel,
	dtIniInputsProps,
	dtEndLabel,
	dtEndInputsProps,
	perdasLabel,
	perdasInputProps,
	descProinfaLabel,
	descProinfaInputProps,
	sazonalidadeLabel,
	sazonalidadeInputProps,
	dtSazonalidadeLabel,
	dtSazonalidadeInputsProps,
	energiaLabel,
	energiaInputProps,
	modulationLabel,
	modulationInputProps,
	flexMaxLabel,
	flexMaxInputProps,
	flexMinLabel,
	flexMinInputProps,
	dbReajustLabel,
	dbReajustInputProps,
	indexadorLabel,
	indexadorInputProps,
	mesReajustLabel,
	mesReajustInputProps,
	renoveLabel,
	renoveInputProps,
	obsLabel,
	obsInputProps,
	garantiaLabel,
	garantiaInputProps,
	list,
	energyOptions,
	modulationOptions,
	merchantOptions,
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
	const [descInfra, setDescInfra] = useState({ selectedOption: {}});
	const [modulation, setModulation] = useState({ selectedOption: {}});
	const [energy, setEnergy] = useState({ selectedOption: {}});
	const [indexador, setIndexador] = useState({ selectedOption: {}});
	const [renove, setRenove] = useState({ selectedOption: {}});
	const [contrapart, setContrapart] = useState({ selectedOption: {}});
	const [exige, setExige] = useState({ selectedOption: {}});
	const [mes, setMes] = useState({selectedOption: {}});

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

		//desconto pro infa
		let desc
		if (list && list.desconto_proinfa) {
			desc = { id: true, name: 'Sim' }
			handleChange(desc, setDescInfra, 'desconto_proinfa')

		} else {
			desc = { id: false, name: 'Nao' }
			handleChange(desc, setDescInfra, 'desconto_proinfa')
		}

		//modulation
		let modulation
		if (list && list.modulation) {
			modulation = { id: list.modulation, name: list.modulation_name }
			handleChange(modulation, setModulation, 'modulation')
		}

		//tipo energia
		let energy
		if (list && list.tp_energia) {
			energy = { id: list.tp_energia, name: list.type_energy }
			handleChange(energy, setEnergy, 'tp_energia')
		}

		//indexador
		let index
		if (list && list.indexador) {
			index = { id: list.indexador, name: list.indexador == 1 ? 'IPCA' : 'IGPM'}
			handleChange(index, setIndexador, 'indexador')
		}

		//contrato renovado
		let renove
		if (list && list.contrato_renovado) {
			renove = { id: true, name: list.contrato_renovado == true ? 'Sim' : 'Nao'}
			handleChange(renove, setRenove, 'contrato_renovado')
		}

		//contrapart
		let contrapart
		if (list && list.contrapart) {
			contrapart = { id: list.contrapart, name: list.merchant_name}
			handleChange(contrapart, setContrapart, 'contrapart')
		} 

		//exige
		let exige
		if (list && list.exige_garantia) {
			exige = { id: list.exige_garantia, name: list.exige_garantia == 1 ? 'Sim' : list.exige_garantia == 0 ? 'Nao' : 'Sim' }
			handleChange(exige, setExige, 'exige_garantia')
		}

		//mes
		if(list && list.mes_reajust){
			let mes  = meses.filter(index => index.id == list.mes_reajust)[0];
			handleChange(mes, setMes, 'mes_reajust')
		}

	}, [list])


	React.useEffect(() => {
		register({ name: 'active' });
		register({ name: 'desconto_proinfa' });
		register({ name: 'modulation' });
		register({ name: 'tp_energia' });
		register({ name: 'indexador' });
		register({ name: 'contrapart' });
		register({ name: 'exige_garantia' });
		register({ name: 'contrato_renovado' });
		register({ name: 'mes_reajust' });
	}, [register]);

	return (
		<Card title="Novo contrato">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={3} lg={3} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={target => handleChange(target, setActive, 'active')}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={contractCodLabel}
							{...contractCodInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<SelectLabel
							label={contrPartLabel}
							{...contrPartInputProps}
							options={merchantOptions}
							value={contrapart.selectedOption}
							onChange={target => handleChange(target, setContrapart, 'contrapart')}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={complementarLabel}
							{...complementarInputProps}
							innerRef={register}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							type="date"
							label={dtIniLabel}
							{...dtIniInputsProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							type="date"
							label={dtEndLabel}
							{...dtEndInputsProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<InputLabel
							label={perdasLabel}
							{...perdasInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={3} md={12}>
						<SelectLabel
							label={descProinfaLabel}
							{...descProinfaInputProps}
							options={[{ id: true, name: 'Sim' }, { id: false, name: 'Näo' }]}
							value={descInfra.selectedOption}
							onChange={target => handleChange(target, setDescInfra, 'desconto_proinfa')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							label={sazonalidadeLabel}
							{...sazonalidadeInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							type="date"
							label={dtSazonalidadeLabel}
							{...dtSazonalidadeInputsProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={modulationLabel}
							{...modulationInputProps}
							options={modulationOptions}
							value={modulation.selectedOption}
							onChange={target => handleChange(target, setModulation, 'modulation')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							label={flexMinLabel}
							{...flexMinInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							label={flexMaxLabel}
							{...flexMaxInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={energiaLabel}
							{...energiaInputProps}
							options={energyOptions}
							value={energy.selectedOption}
							onChange={target => handleChange(target, setEnergy, 'tp_energia')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							label={dbReajustLabel}
							{...dbReajustInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={indexadorLabel}
							{...indexadorInputProps}
							options={[{ id: 1, name: 'IPCA' }, { id: 2, name: 'IGPM' }]}
							value={indexador.selectedOption}
							onChange={target => handleChange(target, setIndexador, 'indexador')}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={mesReajustLabel}
							{...mesReajustInputProps}
							options={meses}
							value={mes.selectedOption}
							onChange={target => handleChange(target, setMes, 'mes_reajust')}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={renoveLabel}
							{...renoveInputProps}
							options={[{ id: true, name: 'Sim' }, { id: false, name: 'Näo' }]}
							value={renove.selectedOption}
							onChange={target => handleChange(target, setRenove, 'contrato_renovado')}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<InputLabel
							label={obsLabel}
							{...obsInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={4} lg={4} md={12}>
						<SelectLabel
							label={garantiaLabel}
							{...garantiaInputProps}
							options={[{ id: 1, name: 'Sim' }, { id: 0, name: 'Näo' }, { id: 3, name: 'Pendente' }]}
							value={exige.selectedOption}
							onChange={target => handleChange(target, setExige, 'exige_garantia')}
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
	contractCodLabel: PropTypes.string,
	contractCodInputProps: PropTypes.shape({}),
	contrPartLabel: PropTypes.string,
	contrPartInputProps: PropTypes.shape({}),
	complementarLabel: PropTypes.string,
	complementarInputProps: PropTypes.shape({}),
	dtIniLabel: PropTypes.string,
	dtIniInputProps: PropTypes.shape({}),
	dtEndLabel: PropTypes.string,
	dtEndInputProps: PropTypes.shape({}),
	perdasLabel: PropTypes.string,
	perdasInputProps: PropTypes.shape({}),
	descProinfaLabel: PropTypes.string,
	descProinfaInputProps: PropTypes.shape({}),
	sazonalidadeLabel: PropTypes.string,
	sazonalidadeInputProps: PropTypes.shape({}),
	dtSazonalidadeLabel: PropTypes.string,
	dtSazonalidadeInputProps: PropTypes.shape({}),
	energiaLabel: PropTypes.string,
	energiaInputProps: PropTypes.shape({}),
	modulationLabel: PropTypes.string,
	modulationInputProps: PropTypes.shape({}),
	flexMaxLabel: PropTypes.string,
	flexMaxInputProps: PropTypes.shape({}),
	flexMinLabel: PropTypes.string,
	flexMinInputProps: PropTypes.shape({}),
	dbReajustLabel: PropTypes.string,
	dbReajustInputProps: PropTypes.shape({}),
	indexadorLabel: PropTypes.string,
	indexadorInputProps: PropTypes.shape({}),
	mesReajustLabel: PropTypes.string,
	mesReajustInputProps: PropTypes.shape({}),
	renoveLabel: PropTypes.string,
	renoveInputProps: PropTypes.shape({}),
	obsLabel: PropTypes.string,
	obsInputProps: PropTypes.shape({}),
	garantiaLabel: PropTypes.string,
	garantiaInputProps: PropTypes.shape({}),
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
	contractCodLabel: 'Código do Contrato',
	contractCodInputProps: {
		name: 'contracts_cod',
		id: 'contracts_cod',
		placeholder: 'Código do Contrato',
	},
	contrPartLabel: 'Contraparte',
	contrPartInputProps: {
		name: 'contrapart',
		id: 'contrapart',
		required: true
	},
	complementarLabel: 'Contrato complementar',
	complementarInputProps: {
		name: 'contrato_complementar',
		id: 'contrato_complementar',
		placeholder: 'Contrato complementar',
		required: true
	},
	dtIniLabel: 'Data inicio',
	dtIniInputsProps: {
		name: 'dt_ini',
		id: 'dt_ini',
		required: true
	},
	dtEndLabel: 'Data Final',
	dtEndInputsProps: {
		name: 'dt_end',
		id: 'dt_end',
		required: true
	},
	perdasLabel: 'Perdas',
	perdasInputProps: {
		name: 'perdas',
		id: 'perdas',
		placeholder: 'Perdas',

	},
	descProinfaLabel: 'Desconto proinfa',
	descProinfaInputProps: {
		name: 'desconto_proinfa',
		id: 'desconto_proinfa',
	},
	sazonalidadeLabel: 'Sazonalidade',
	sazonalidadeInputProps: {
		name: 'sazonalidade',
		id: 'sazonalidade',
		placeholder: 'Sazonalidade',
	},
	dtSazonalidadeLabel: 'Data Sazonalidade',
	dtSazonalidadeInputsProps: {
		name: 'date_sazonalidade',
		id: 'date_sazonalidade`',
		placeholder: 'Data Sazonalidade',
	},
	energiaLabel: 'Tipo de energia',
	energiaInputProps: {
		name: 'tp_energia',
		id: 'tp_energia',
	},
	modulationLabel: 'Modulaçäo',
	modulationInputProps: {
		name: 'modulation',
		id: 'modulation',
	},
	flexMaxLabel: 'Flex Max',
	flexMaxInputProps: {
		name: 'flex_max',
		id: 'flex_max',
		placeholder: 'Flex Max',
	},
	flexMinLabel: 'Flex Min',
	flexMinInputProps: {
		name: 'flex_min',
		id: 'flex_min',
		placeholder: 'Flex Min',
	},
	dbReajustLabel: 'Data base Reajuste',
	dbReajustInputProps: {
		name: 'dt_reajuste',
		id: 'dt_reajuste',
		placeholder: 'Data base Reajuste',
	},
	indexadorLabel: 'Indexador',
	indexadorInputProps: {
		name: 'indexador',
		id: 'indexador',
		placeholder: 'Indexador',
	},
	mesReajustLabel: 'Mes Reajuste',
	mesReajustInputProps: {
		name: 'mes_reajust',
		id: 'mes_reajust',
		placeholder: 'Mes Reajuste',
	},
	renoveLabel: 'Contrato renovado',
	renoveInputProps: {
		name: 'renove',
		id: 'renove',
		placeholder: 'Contrato renovado',
	},
	obsLabel: 'Obs',
	obsInputProps: {
		name: 'obs',
		id: 'obs',
		placeholder: 'Obs',
	},
	garantiaLabel: 'Exige Garantia',
	garantiaInputProps: {
		name: 'garatia',
		id: 'garantia',
		placeholder: 'Exige Garantia',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormContracts;
