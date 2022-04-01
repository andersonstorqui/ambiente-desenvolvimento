import * as types from './types';

export const getOperationSeg = query => {
	return {
		type: types.GET_OPERATION_SEG,
		query
	}
};

export const setOperationSeg = segment => {
	return {
		type: types.SET_OPERATION_SEG,
		segment
	}
};

export const insertOperationSeg = segment => {
	return {
		type: types.INSERT_OPERATION_SEG,
		segment
	}
};

export const select = segment => {
	return {
		type: types.SELECT,
		segment
	}
};

export const setRefresh = refresh => {
	return {
		type: types.REFRESH,
		refresh
	}
};

export const updateOperationSeg = (query, id) => {
	return {
		type: types.UPDATE_OPERATION_SEG,
		query,
		id
	}
};

export const activeOrDesactiveSeg = segment => {
	return {
		type: types.ACTIVEORDESACTIVE_SEG,
		segment
	}
};

export const deleteOperatingSegment = segment => {
	return {
		type: types.DELETE_OPERATION_SEG,
		segment
	}
};

export default {
	getOperationSeg,
	setOperationSeg,
	select,
	setRefresh,
	insertOperationSeg,
	updateOperationSeg,
	activeOrDesactiveSeg,
	deleteOperatingSegment
}