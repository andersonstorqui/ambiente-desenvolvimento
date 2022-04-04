import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,

};

const distReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_DIST:
			return {
				...state,
				list: action.dist
			};
		case types.SELECT_DIST:
			return {
				...state,
				select: action.dist
			};
		case types.SET_DIST_REFRESH:
			return {
				...state,
				refresh: action.refresh,
			};
		default:
			return state;
	}
}

export default distReducer;