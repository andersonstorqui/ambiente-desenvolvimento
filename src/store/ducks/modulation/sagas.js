import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as modulationApi from '../../../api/appApi/modulation';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';

export function* getModulation(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(modulationApi.getModulation, query);

		yield put(actions.setModulation(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Modulação.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addModulation(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.modulation;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(modulationApi.insertModulation, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Modulação cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/modulation');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar modulação.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveModulation(payload) {
	const { modulation } = payload;
	try {
		const data = {
			active: !modulation.active,
			id: modulation.id,
			modulation: modulation.modulation
		};

		const response = yield call(modulationApi.updateModulation, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getModulation(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status da Modulação.',
				'error',
			),
		);
	}
}

export function* editModulation(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	data.active = data.active == null ? true : data.active;
	
	try {
		const response = yield call(modulationApi.updateModulation, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Modulação editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/modulation');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Modulação.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteModulation(payload) {
	yield put(apiActions.apiStart());

	const id = payload.modulation;

	try {
		const response = yield call(modulationApi.deleteModulation, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Modulação deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getModulation(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Modulação.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchModulation() {
	yield takeLatest(types.GET_MODULATION, getModulation);
	yield takeLatest(types.INSERT_MODULATION, addModulation);
	yield takeLatest(types.ACTIVEORDESACTIVE_MODULATION, activeDesactiveModulation);
	yield takeLatest(types.UPDATE_MODULATION, editModulation);
	yield takeLatest(types.DELETE_MODULATION, deleteModulation);
}
