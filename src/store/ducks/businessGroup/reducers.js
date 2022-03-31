import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const businessGroupReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_BUSINESS_GROUP:
			return {
				...state,
				list: action.group
			};
		case types.SELECT_BUSINESS_GROUP:
			return {
				...state,
				select: action.group
			};
		case types.SET_BUSINESS_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default businessGroupReducer;