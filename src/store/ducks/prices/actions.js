import * as types from './types';

export const getPrices = query => {
	return {
		type: types.GET_PRICES,
		query
	}
};

export const setPrices = prices => {
	return {
		type: types.SET_PRICES,
		prices
	}
};

export const select = prices => {
	return {
		type: types.SELECT_PRICES,
		prices
	}
};

export const insertPrices = prices => {
	return {
		type: types.INSERT_PRICES,
		prices
	}
};

export const updatePrices = (query, id) => {
	return {
		type: types.UPDATE_PRICES,
		query,
		id,
	}
};

export const deletePrices = prices => {
	return {
		type: types.DELETE_PRICES,
		prices
	}
};

export const activeOrDesactivePrices = prices => {
	return {
		type: types.ACTIVEDESACTIVE_PRICES,
		prices
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_PRICES_REFRESH,
		refresh,
	};
};

export default {
	getPrices,
	setPrices,
	insertPrices,
	select,
	updatePrices,
	deletePrices,
	activeOrDesactivePrices,
	setRefresh
}