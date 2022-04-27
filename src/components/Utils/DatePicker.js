import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
import { today } from '../../lib/utils/functions';
import PropTypes from '../../lib/utils/propTypes';
import { FormGroup, InputGroup, InputGroupAddon, Label } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';


registerLocale('ptBR', ptBR);

const DatePickerComponent = ({
	startDate,
	handleChange,
	className,
	placeholderText,
	label,
	...rest
}) => {
	return (
		<FormGroup {...rest}>
			<div className="">
				<Label>{label}</Label>
				<InputGroup>
					<DatePicker
						selected={
							startDate !== 'Invalid date'
								? new Date(moment(startDate, 'DD/MM/YYYY HH:mm Z'))
								: null
						}
						className="form-control"
						onChange={handleChange}
						required='true'
						locale="ptBR"
						dateFormat="dd/MM/yyyy"
						placeholderText={placeholderText}
						{...rest}
					/>
				</InputGroup>
			</div>
		</FormGroup>
	);
};

DatePickerComponent.propTypes = {
	startDate: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	placeholderText: PropTypes.string,
};

DatePickerComponent.defaultProps = {
	startDate: today(),
	placeholderText: 'data',
	className: '',
};

export default DatePickerComponent;
