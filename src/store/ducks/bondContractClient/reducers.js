import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const bondContractClientReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_BOND_CONTRACT_CLIENT:
			return {
				...state,
				list: action.bond
			};
		case types.SELECT_BOND_CONTRACT_CLIENT:
			return {
				...state,
				select: action.bond
			};
		case types.SET_BOND_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default bondContractClientReducer;