import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as merchantEnergyApi from '../../../api/appApi/merchant';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getMerchantEnergy(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(merchantEnergyApi.getMerchantEnergy, query);

		yield put(actions.setMerchantEnergy(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Comerciante de energia.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addMerchantEnergy(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.merchant;

	try {
		const response = yield call(merchantEnergyApi.insertMerchantEnergy, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Comerciante cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/merchant');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Comerciante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveMerchant(payload) {
	const { merchant } = payload;
	try {
		const data = {
			active: !merchant.active,
			id: merchant.id,
			merchant: merchant.merchant
		};

		const response = yield call(merchantEnergyApi.updateMerchantEnergy, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getMerchantEnergy(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do Comerciante.',
				'error',
			),
		);
	}
}

export function* editMerchantEnergy(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	try {
		const response = yield call(merchantEnergyApi.updateMerchantEnergy, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Comerciante editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/merchant');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Comerciante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteMerchantEnergy(payload) {
	yield put(apiActions.apiStart());

	const id = payload.segment;

	try {
		const response = yield call(merchantEnergyApi.deleteMerchantEnergy, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Comerciante deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getMerchantEnergy(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Comerciante.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchMerchantEnergy() {
	yield takeLatest(types.GET_MERCHANT_ENERGY, getMerchantEnergy);
	yield takeLatest(types.INSERT_MERCHANT_ENERGY, addMerchantEnergy);
	yield takeLatest(types.ACTIVEORDESACTIVE_MERCH, activeDesactiveMerchant);
	yield takeLatest(types.UPDATE_MERCHANT_ENERGY, editMerchantEnergy);
	yield takeLatest(types.DELETE_MERCHANT_ENERGY, deleteMerchantEnergy);
}
