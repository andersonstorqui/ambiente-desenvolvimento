import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,
};

const modulationReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_MODULATION:
			return {
				...state,
				list: action.modulation
			};
		case types.SELECT:
			return {
				...state,
				select: action.modulation
			};
		case types.SET_MODULATION_REFRESH:
			return {
				...state,
				refresh: action.modulation,
			};
		default:
			return state;
	}
}

export default modulationReducer;