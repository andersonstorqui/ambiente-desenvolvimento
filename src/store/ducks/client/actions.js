import * as types from './types';

export const getClient = query => {
	return {
		type: types.GET_CLIENT,
		query
	}
};

export const setClient = client => {
	return {
		type: types.SET_CLIENT,
		client
	}
};

export const select = client => {
	return {
		type: types.SELECT_CLIENT,
		client
	}
};

export const insertClient = client => {
	return {
		type: types.INSERT_CLIENT,
		client
	}
};

export const updateClient = (query, id) => {
	return {
		type: types.UPDATE_CLIENT,
		query,
		id,
	}
};

export const deleteClient = client => {
	return {
		type: types.DELETE_CLIENT,
		client
	}
};

export const activeOrDesactiveClient = client => {
	return {
		type: types.ACTIVEDESACTIVE_CLIENT,
		client
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_CLIENT_REFRESH,
		refresh,
	};
};

export default {
	getClient,
	setClient,
	insertClient,
	select,
	updateClient,
	deleteClient,
	activeOrDesactiveClient,
	setRefresh
}