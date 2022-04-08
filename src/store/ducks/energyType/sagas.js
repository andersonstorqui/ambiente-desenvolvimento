import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as energyTypeApi from '../../../api/appApi/energyType';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';

export function* getEnergyTYpe(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(energyTypeApi.getEnergyType, query);

		yield put(actions.setEnergyType(response.data.data));
	} catch (error) {
		console.log(error)
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Tipos de energia.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addEnergyType(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.types;

	try {
		const response = yield call(energyTypeApi.insertEnergyType, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Tipo de energia cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/energy-types');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Tipo de energia.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveType(payload) {
	const { types } = payload;
	try {
		const data = {
			active: !types.active,
			id: types.id,
			type: types.type
		};

		const response = yield call(energyTypeApi.updateEnergyType, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getEnergyType(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do tipo de energia.',
				'error',
			),
		);
	}
}

export function* editEnergyType(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	try {
		const response = yield call(energyTypeApi.updateEnergyType, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Tipo de energia editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/energy-types');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Tipos de energia.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteEnergyTypes(payload) {
	yield put(apiActions.apiStart());

	const id = payload.types;

	try {
		const response = yield call(energyTypeApi.deleteEnergyType, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Tipo de energia deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getEnergyType(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Tipo de energia.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchEnergyTypes() {
	yield takeLatest(types.GET_ENERGY_TYPE, getEnergyTYpe);
	yield takeLatest(types.INSERT_ENERGY_TYPE, addEnergyType);
	yield takeLatest(types.ACTIVEORDESACTIVE_TYPE, activeDesactiveType);
	yield takeLatest(types.UPDATE_ENERGY_TYPE, editEnergyType);
	yield takeLatest(types.DELETE_ENERGY_TYPE, deleteEnergyTypes);
}
