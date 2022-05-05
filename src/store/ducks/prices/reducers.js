import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const pricesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_PRICES:
			return {
				...state,
				list: action.prices
			};
		case types.SELECT_PRICES:
			return {
				...state,
				select: action.prices
			};
		case types.SET_PRICES_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default pricesReducer;