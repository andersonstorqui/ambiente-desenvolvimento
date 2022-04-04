import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const clientReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_CLIENT:
			return {
				...state,
				list: action.client
			};
		case types.SELECT_CLIENT:
			return {
				...state,
				select: action.client
			};
		case types.SET_CLIENT_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default clientReducer;