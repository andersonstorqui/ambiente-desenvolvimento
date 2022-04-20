import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as distApi from '../../../api/appApi/dist';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getDist(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(distApi.getDist, query);

		yield put(actions.setDist(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Distribuidora.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addDist(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.dist;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(distApi.insertDist, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Distribuidora adicionada com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/dist');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar distribuidora.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveDist(payload) {
	const { dist } = payload;
	try {
		const data = {
			active: !dist.active,
			id: dist.id,
			dist: dist.dist
		};

		const response = yield call(distApi.updateDist, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getDist(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status da distribuidora.',
				'error',
			),
		);
	}
}

export function* editDist(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	data.active = data.active == null ? true : data.active;
	
	try {
		const response = yield call(distApi.updateDist, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Distribuidora editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/dist');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar distribuidora.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteDist(payload) {
	yield put(apiActions.apiStart());

	const id = payload.dist;

	try {
		const response = yield call(distApi.deleteDist, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Distribuidora deletada com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getDist(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Distribuidora.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchDist() {
	yield takeLatest(types.GET_DIST, getDist);
	yield takeLatest(types.INSERT_DIST, addDist);
	yield takeLatest(types.ACTIVEDESACTIVE_DIST, activeDesactiveDist);
	yield takeLatest(types.UPDATE_DIST, editDist);
	yield takeLatest(types.DELETE_DIST, deleteDist);
}
