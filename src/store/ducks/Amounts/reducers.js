import * as types from './types';

const initialState = {
	list: false,
	months: false,
	select: false,
	refresh: false,
};

const amountsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_AMOUNTS:
			return {
				...state,
				list: action.amount
			};
		case types.SELECT_AMOUNTS:
			return {
				...state,
				select: action.amount
			};
		case types.SET_AMOUNTS_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default amountsReducer;