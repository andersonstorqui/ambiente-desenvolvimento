import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as genericApi from '../../../api/appApi/generics';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions } from '../api';
import * as types from './types';



export function* getState(payload) {


	try {
		const response = yield call(genericApi.getState);

		yield put(actions.setState(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Estados.',
				'error',
			),
		);
	}

}

export function* getCity(payload) {


	try {
		const response = yield call(genericApi.getCity, payload);

		yield put(actions.setCity(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar cidades.',
				'error',
			),
		);
	}

}

export default function* watchGenerics() {
	yield takeLatest(types.GET_STATE, getState);
	yield takeLatest(types.GET_CITY, getCity);

}



