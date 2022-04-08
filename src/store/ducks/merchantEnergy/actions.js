import * as types from './types';

export const getMerchantEnergy = query => {
	return {
		type: types.GET_MERCHANT_ENERGY,
		query
	}
};

export const setMerchantEnergy = merchant => {
	return {
		type: types.SET_MERCHANT_ENERGY,
		merchant
	}
};

export const insertMerchantEnergy = merchant => {
	return {
		type: types.INSERT_MERCHANT_ENERGY,
		merchant
	}
};

export const select = merchant => {
	return {
		type: types.SELECT,
		merchant
	}
};

export const setRefresh = refresh => {
	return {
		type: types.REFRESH,
		refresh
	}
};

export const updateMerchantEnergy = (query, id) => {
	return {
		type: types.UPDATE_MERCHANT_ENERGY,
		query,
		id
	}
};

export const activeOrDesactiveMerch = merchant => {
	return {
		type: types.ACTIVEORDESACTIVE_MERCH,
		merchant
	}
};

export const deleteOperatingMerch = merchant => {
	return {
		type: types.DELETE_MERCHANT_ENERGY,
		merchant
	}
};

export default {
	getMerchantEnergy,
	setMerchantEnergy,
	select,
	setRefresh,
	insertMerchantEnergy,
	updateMerchantEnergy,
	activeOrDesactiveMerch,
	deleteOperatingMerch
}