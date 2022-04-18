import * as types from './types';

export const getContracts = query => {
	return {
		type: types.GET_CONTRACTS,
		query
	}
};

export const setContracts = contracts => {
	return {
		type: types.SET_CONTRACTS,
		contracts
	}
};

export const select = contracts => {
	return {
		type: types.SELECT_CONTRACTS,
		contracts
	}
};

export const insertContracts = contracts => {
	return {
		type: types.INSERT_CONTRACTS,
		contracts
	}
};

export const updateContracts = (query, id) => {
	return {
		type: types.UPDATE_CONTRACTS,
		query,
		id,
	}
};

export const deleteContracts = contracts => {
	return {
		type: types.DELETE_CONTRACTS,
		contracts
	}
};

export const activeOrDesactiveContracts = contracts => {
	return {
		type: types.ACTIVEDESACTIVE_CONTRACTS,
		contracts
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_CONTRACTS_REFRESH,
		refresh,
	};
};

export default {
	getContracts,
	setContracts,
	insertContracts,
	select,
	updateContracts,
	deleteContracts,
	activeOrDesactiveContracts,
	setRefresh
}