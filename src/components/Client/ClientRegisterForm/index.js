import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import PropTypes from '../../../lib/utils/propTypes';
import Card from '../../Utils/Card/FormCard';
import { InputLabel, SelectLabel, SelectAsyncLabel } from '../../Utils';

const FormClient = ({
	clientLabel,
	clientInputProps,
	corporateLabel,
	corporateInputProps,
	groupLabel,
	groupInputProps,
	activeLabel,
	activeInputProps,
	segmentLabel,
	segmentInputProps,
	respLabel,
	respInputProps,
	distLabel,
	distInputProps,
	unidadeCLabel,
	unidadeCInputProps,
	countryLabel,
	countryInputProps,
	stateLabel,
	stateInputProps,
	cityLabel,
	cityInputProps,

	btnLabelSubmit,
	btnLabelCancel,
	handleNavigation,
	onSubmit,
	list,
	groups,
	dist,
	segment,
	user,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: list,
	});


	let status
	if (list) {
		if (list.active) {
			status = { id: true, name: 'Ativo' }
		} else {
			status = { id: false, name: 'Inativo' }

		}
	}

	const [active, setActive] = useState({ selectedOption: status ? status : '' })
	const handleChange = selectedOption => {
		setValue('active', selectedOption.id);
		setActive({ selectedOption });
	};



	React.useEffect(() => {
		register({ name: 'active' });
	}, [register]);

	return (
		<Card title="Novo cliente">
			<form onSubmit={handleSubmit(onSubmit)} {...restProps}>
				<Row>
					<Col xl={6} lg={12} md={12}>
						<InputLabel
							label={clientLabel}
							{...clientInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={activeLabel}
							{...activeInputProps}
							options={[{ id: true, name: 'Ativo' }, { id: false, name: 'Inativo' }]}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={groupLabel}
							{...groupInputProps}
							options={groups}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={corporateLabel}
							{...corporateInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={segmentLabel}
							{...segmentInputProps}
							options={segment}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={respLabel}
							{...respInputProps}
							options={user}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={distLabel}
							{...distInputProps}
							options={dist}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col xl={3} lg={12} md={12}>
						<InputLabel
							label={unidadeCLabel}
							{...unidadeCInputProps}
							innerRef={register}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectAsyncLabel
							label={countryLabel}
							{...countryInputProps}
							options={dist}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectAsyncLabel
							label={stateLabel}
							{...stateInputProps}
							options={dist}
							value={active.selectedOption}
							onChange={handleChange}
						/>
					</Col>
					<Col xl={3} lg={12} md={12}>
						<SelectLabel
							label={cityLabel}
							{...cityInputProps}
							options={dist}
							value={active.selectedOption}
							onChange={handleChange}
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

FormClient.propTypes = {
	clientLabel: PropTypes.string,
	clientInputProps: PropTypes.shape({}),
	corporateLabel: PropTypes.string,
	corporateInputProps: PropTypes.shape({}),
	activeLabel: PropTypes.string,
	activeInputProps: PropTypes.shape({}),
	segmentLabel: PropTypes.string,
	segmentInputProps: PropTypes.shape({}),
	respLabel: PropTypes.string,
	respInputProps: PropTypes.shape({}),
	unidadeCLabel: PropTypes.string,
	unidadeCInputProps: PropTypes.shape({}),
	countryLabel: PropTypes.string,
	countryInputProps: PropTypes.shape({}),
	stateLabel: PropTypes.string,
	stateInputProps: PropTypes.shape({}),
	cityLabel: PropTypes.string,
	cityInputProps: PropTypes.shape({}),
	distLabel: PropTypes.string,
	distInputProps: PropTypes.shape({}),
	groupLabel: PropTypes.string,
	groupInputProps: PropTypes.shape({}),
	btnLabelSubmit: PropTypes.string,
	btnLabelCancel: PropTypes.string,
	handleNavigation: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,
};

FormClient.defaultProps = {
	clientLabel: 'Cliente',
	clientInputProps: {
		name: 'client',
		id: 'client',
		placeholder: 'cliente',
		required: true,
	},
	groupLabel: 'Grupo',
	groupInputProps: {
		name: 'group',
		id: 'group',
		placeholder: 'Grupo',
		required: true,
	},
	corporateLabel: 'Razão social',
	corporateInputProps: {
		name: 'corporate',
		id: 'corporate',
		placeholder: 'Razão social',
		required: true,
	},
	segmentLabel: 'Segmento de atuação',
	segmentInputProps: {
		name: 'segment',
		id: 'segment',
		placeholder: 'Segmento de atuação',
		required: true,
	},
	respLabel: 'Responsável comercial',
	respInputProps: {
		name: 'resp',
		id: 'resp',
		placeholder: 'Responsável comercial',
		required: true,
	},
	distLabel: 'Distribuidora',
	distInputProps: {
		name: 'dist',
		id: 'dist',
		placeholder: 'Distribuidora',
		required: true,
	},
	unidadeCLabel: 'Unidade Consumidora',
	unidadeCInputProps: {
		name: 'uni',
		id: 'uni',
		placeholder: 'Unidade Consumidora',
		required: true,
	},
	countryLabel: 'País',
	countryInputProps: {
		name: 'country',
		id: 'country',
		placeholder: 'País',
		required: true,
	},
	stateLabel: 'Estado',
	stateInputProps: {
		name: 'state',
		id: 'state',
		placeholder: 'Estado',
		required: true,
	},
	cityLabel: 'Cidade',
	cityInputProps: {
		name: 'city',
		id: 'city',
		placeholder: 'Cidade',
		required: true,
	},
	activeLabel: 'Ativo',
	activeInputProps: {
		name: 'active',
		id: 'active',
	},
	btnLabelSubmit: 'Salvar',
	btnLabelCancel: 'Cancelar',
};

export default FormClient;
