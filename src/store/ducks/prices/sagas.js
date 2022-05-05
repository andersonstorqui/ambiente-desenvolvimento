import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as pricesApi from '../../../api/appApi/price';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';


export function* getPrice(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));
	try {
		const response = yield call(pricesApi.getPrices, query);

		yield put(actions.setPrices(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Preços.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addPrice(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.prices;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(pricesApi.insertPrices, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Preço adicionado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/prices');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Preços.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactivePrice(payload) {
	const { prices } = payload;
	try {
		const { id } = prices.id;
		prices.active = !prices.active
		
		const response = yield call(pricesApi.updatePrices, prices, id);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getPrices(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do preço.',
				'error',
			),
		);
	}
}

export function* editPrice(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	data.active = data.active == null ? true : data.active;
	
	try {
		const response = yield call(pricesApi.updatePrices, data, id);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Preço editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/prices');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar preço.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deletePrice(payload) {
	yield put(apiActions.apiStart());

	const id = payload.prices;

	try {
		const response = yield call(pricesApi.deletePrices, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Preços deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getPrices(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar preços.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export default function* watchPrices() {
	yield takeLatest(types.GET_PRICES, getPrice);
	yield takeLatest(types.INSERT_PRICES, addPrice);
	yield takeLatest(types.ACTIVEDESACTIVE_PRICES, activeDesactivePrice);
	yield takeLatest(types.UPDATE_PRICES, editPrice);
	yield takeLatest(types.DELETE_PRICES, deletePrice);
}
