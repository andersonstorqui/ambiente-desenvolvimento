import * as types from './types';

export const getAmounts = query => {
	return {
		type: types.GET_AMOUNTS,
		query
	}
};


export const setAmounts = amount => {
	return {
		type: types.SET_AMOUNTS,
		amount
	}
};


export const select = amount => {
	return {
		type: types.SELECT_AMOUNTS,
		amount
	}
};

export const insertAmounts = amount => {
	return {
		type: types.INSERT_AMOUNTS,
		amount
	}
};

export const updateAmounts = (query, id) => {
	return {
		type: types.UPDATE_AMOUNTS,
		query,
		id,
	}
};

export const deleteAmounts = amount => {
	return {
		type: types.DELETE_AMOUNTS,
		amount
	}
};

export const activeOrDesactiveAmounts = amount => {
	return {
		type: types.ACTIVEDESACTIVE_AMOUNTS,
		amount
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_AMOUNTS_REFRESH,
		refresh,
	};
};

export default {
	getAmounts,
	setAmounts,
	insertAmounts,
	select,
	updateAmounts,
	deleteAmounts,
	activeOrDesactiveAmounts,
	setRefresh
}