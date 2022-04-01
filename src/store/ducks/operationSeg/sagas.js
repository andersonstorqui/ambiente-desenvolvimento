import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as businessGroupApi from '../../../api/appApi/businessGroup';
import * as operationSegApi from '../../../api/appApi/operationSeg';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getOperationSeg(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(operationSegApi.getOperationSeg, query);

		yield put(actions.setOperationSeg(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Segmento.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addOperationSeg(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.segment;

	try {
		const response = yield call(operationSegApi.insertOperationSeg, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Segmento cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/operation-segment');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Segmento.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveSegment(payload) {
	const { segment } = payload;
	try {
		const data = {
			active: !segment.active,
			id: segment.id,
			segment: segment.segment
		};

		const response = yield call(operationSegApi.updateOperationSeg, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getOperationSeg(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do segmento.',
				'error',
			),
		);
	}
}

export function* editOperationSegment(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	try {
		const response = yield call(operationSegApi.updateOperationSeg, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Segmento editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/operation-segment');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Semento.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteOperationSeg(payload) {
	yield put(apiActions.apiStart());

	const id = payload.segment;

	try {
		const response = yield call(operationSegApi.deleteOperationSeg, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Segmento deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getOperationSeg(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Segmento.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchOperationSeg() {
	yield takeLatest(types.GET_OPERATION_SEG, getOperationSeg);
	yield takeLatest(types.INSERT_OPERATION_SEG, addOperationSeg);
	yield takeLatest(types.ACTIVEORDESACTIVE_SEG, activeDesactiveSegment);
	yield takeLatest(types.UPDATE_OPERATION_SEG, editOperationSegment);
	yield takeLatest(types.DELETE_OPERATION_SEG, deleteOperationSeg);
}
