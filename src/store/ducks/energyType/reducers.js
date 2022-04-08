import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,
};

const energyTypeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_ENERGY_TYPE:
			return {
				...state,
				list: action.types
			};
		case types.SELECT:
			return {
				...state,
				select: action.types
			};
		case types.SET_TYPE_REFRESH:
			return {
				...state,
				refresh: action.types,
			};
		default:
			return state;
	}
}

export default energyTypeReducer;