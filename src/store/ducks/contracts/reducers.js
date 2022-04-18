import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const contractsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_CONTRACTS:
			return {
				...state,
				list: action.contracts
			};
		case types.SELECT_CONTRACTS:
			return {
				...state,
				select: action.contracts
			};
		case types.SET_CONTRACTS_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default contractsReducer;