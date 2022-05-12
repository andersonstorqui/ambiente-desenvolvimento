import * as types from './types';

export const getBondContractClient = query => {
	return {
		type: types.GET_BOND_CONTRACT_CLIENT,
		query
	}
};

export const setBondContractClient = bond => {
	return {
		type: types.SET_BOND_CONTRACT_CLIENT,
		bond
	}
};

export const select = bond => {
	return {
		type: types.SELECT_BOND_CONTRACT_CLIENT,
		bond
	}
};

export const insertBondContractClient = bond => {
	return {
		type: types.INSERT_BOND_CONTRACT_CLIENT,
		bond
	}
};

export const updateBondContractClient = (query, id) => {
	return {
		type: types.UPDATE_BOND_CONTRACT_CLIENT,
		query,
		id,
	}
};

export const deleteBondContractClient = bond => {
	return {
		type: types.DELETE_BOND_CONTRACT_CLIENT,
		bond
	}
};

export const activeOrDesactiveBondContractClient = bond => {
	return {
		type: types.ACTIVEDESACTIVE_BOND_CONTRACT_CLIENT,
		bond
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_BOND_REFRESH,
		refresh,
	};
};

export default {
	getBondContractClient,
	setBondContractClient,
	insertBondContractClient,
	select,
	updateBondContractClient,
	deleteBondContractClient,
	activeOrDesactiveBondContractClient,
	setRefresh
}