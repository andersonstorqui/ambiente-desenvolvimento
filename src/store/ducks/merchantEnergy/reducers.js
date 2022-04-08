import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,
};

const merchantEnergyReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_MERCHANT_ENERGY:
			return {
				...state,
				list: action.merchant
			};
		case types.SELECT:
			return {
				...state,
				select: action.merchant
			};
		case types.SET_MERCH_REFRESH:
			return {
				...state,
				refresh: action.merchant,
			};
		default:
			return state;
	}
}

export default merchantEnergyReducer;