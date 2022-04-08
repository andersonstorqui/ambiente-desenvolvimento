import * as typess from './types';

export const getEnergyType = query => {
	return {
		type: typess.GET_ENERGY_TYPE,
		query
	}
};

export const setEnergyType = types => {
	return {
		type: typess.SET_ENERGY_TYPE,
		types
	}
};

export const insertEnergyType = types => {
	return {
		type: typess.INSERT_ENERGY_TYPE,
		types
	}
};

export const select = types => {
	return {
		type: typess.SELECT,
		types
	}
};

export const setRefresh = refresh => {
	return {
		type: typess.REFRESH,
		refresh
	}
};

export const updateEnergyType = (query, id) => {
	return {
		type: typess.UPDATE_ENERGY_TYPE,
		query,
		id
	}
};

export const activeOrDesactiveTypes = types => {
	return {
		type: typess.ACTIVEORDESACTIVE_TYPE,
		types
	}
};

export const deleteEnergyType = types => {
	return {
		type: typess.DELETE_ENERGY_TYPE,
		types
	}
};

export default {
	getEnergyType,
	setEnergyType,
	select,
	setRefresh,
	insertEnergyType,
	updateEnergyType,
	activeOrDesactiveTypes,
	deleteEnergyType
}