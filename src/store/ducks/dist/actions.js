import * as types from './types';

export const getDist = query => {
	return {
		type: types.GET_DIST,
		query
	}
};

export const setDist = dist => {
	return {
		type: types.SET_DIST,
		dist
	}
};

export const select = dist => {
	return {
		type: types.SELECT_DIST,
		dist
	}
};

export const insertDist = dist => {
	return {
		type: types.INSERT_DIST,
		dist
	}
};

export const updateDist = (query, id) => {
	return {
		type: types.UPDATE_DIST,
		query,
		id,
	}
};

export const deleteDist = dist => {
	return {
		type: types.DELETE_DIST,
		dist
	}
};

export const activeOrDesactiveDist = dist => {
	return {
		type: types.ACTIVEDESACTIVE_DIST,
		dist
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_DIST_REFRESH,
		refresh,
	};
};

export default {
	getDist,
	setDist,
	insertDist,
	select,
	updateDist,
	deleteDist,
	activeOrDesactiveDist,
	setRefresh
}