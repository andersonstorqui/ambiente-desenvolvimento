import * as types from './types';

export const getModulation = query => {
	return {
		type: types.GET_MODULATION,
		query
	}
};

export const setModulation = modulation => {
	return {
		type: types.SET_MODULATION,
		modulation
	}
};

export const insertModulation = modulation => {
	return {
		type: types.INSERT_MODULATION,
		modulation
	}
};

export const select = modulation => {
	return {
		type: types.SELECT,
		modulation
	}
};

export const setRefresh = refresh => {
	return {
		type: types.REFRESH,
		refresh
	}
};

export const updateModulation = (query, id) => {
	return {
		type: types.UPDATE_MODULATION,
		query,
		id
	}
};

export const activeOrDesactiveModulation = modulation => {
	return {
		type: types.ACTIVEORDESACTIVE_MODULATION,
		modulation
	}
};

export const deleteOperatingModulation = modulation => {
	return {
		type: types.DELETE_MODULATION,
		modulation
	}
};

export default {
	getModulation,
	setModulation,
	select,
	setRefresh,
	insertModulation,
	updateModulation,
	activeOrDesactiveModulation,
	deleteOperatingModulation
}