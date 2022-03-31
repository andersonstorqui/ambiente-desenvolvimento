import * as types from './types';

export const getBusinesGroup = query => {
	return {
		type: types.GET_BUSINESS_GROUP,
		query
	}
};

export const setBusinessGroup = group => {
	return {
		type: types.SET_BUSINESS_GROUP,
		group
	}
};

export const select = group => {
	return {
		type: types.SELECT_BUSINESS_GROUP,
		group
	}
};

export const insertBusinessGroup = group => {
	return {
		type: types.INSERT_BUSINESS_GROUP,
		group
	}
};

export const updateBusinessGroup = (query, id) => {
	return {
		type: types.UPDATE_BUSINESS_GROUP,
		query,
		id,
	}
};

export const deleteBusinessGroup = group => {
	return {
		type: types.DELETE_BUSINESS_GROUP,
		group
	}
};

export const activeOrDesactiveBusinessGroup = group => {
	return {
		type: types.ACTIVEDESACTIVE_BUSINESS_GROUP,
		group
	}
};

export const setRefresh = refresh => {
	return {
		type: types.SET_BUSINESS_REFRESH,
		refresh,
	};
};

export default {
	getBusinesGroup,
	setBusinessGroup,
	insertBusinessGroup,
	select,
	updateBusinessGroup,
	deleteBusinessGroup,
	activeOrDesactiveBusinessGroup,
	setRefresh
}