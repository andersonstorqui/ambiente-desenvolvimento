import * as types from './types';

const initialState = {
	list: false,
	select: false,
	refresh: false,
};

const operationSegReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_OPERATION_SEG:
			return {
				...state,
				list: action.segment
			};
		case types.SELECT:
			return {
				...state,
				select: action.segment
			};
		case types.SET_SEGMENT_REFRESH:
			return {
				...state,
				refresh: action.segment,
			};
		default:
			return state;
	}
}

export default operationSegReducer;