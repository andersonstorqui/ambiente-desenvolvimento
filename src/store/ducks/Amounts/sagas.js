import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as amountApi from '../../../api/appApi/amounts';
import * as monthsApi from '../../../api/appApi/months';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';

export function* getAmounts(payload) {
	const refresh = yield select(selectors.getRefresh);
	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(amountApi.getAmounts, query);

		yield put(actions.setAmounts(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Montantes.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addAmounts(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.amount;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(amountApi.insertAmounts, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Montante cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/amounts');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar montante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveAmounts(payload) {
	const { amount } = payload;
	try {
		amount.active = !amount.active

		const response = yield call(amountApi.updateAmounts, amount);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getAmounts(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do montante.',
				'error',
			),
		);
	}
}

export function* editAmounts(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(amountApi.updateAmounts, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Montante editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/amounts');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar montante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteAmounts(payload) {
	yield put(apiActions.apiStart());

	const id = payload.amounts;
	try {
		const response = yield call(amountApi.deleteAmounts, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Montante deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getAmounts(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar montante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchAmounts() {
	yield takeLatest(types.GET_AMOUNTS, getAmounts);
	yield takeLatest(types.INSERT_AMOUNTS, addAmounts);
	yield takeLatest(types.ACTIVEDESACTIVE_AMOUNTS, activeDesactiveAmounts);
	yield takeLatest(types.UPDATE_AMOUNTS, editAmounts);
	yield takeLatest(types.DELETE_AMOUNTS, deleteAmounts);
}
