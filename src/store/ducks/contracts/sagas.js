import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as contractsApi from '../../../api/appApi/contracts';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getContracts(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));
	try {
		const response = yield call(contractsApi.getContracts, query);

		yield put(actions.setContracts(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Contratos.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addContracts(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.contracts;

	try {
		const response = yield call(contractsApi.insertContracts, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Contrato adicionado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/contracts');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Contrato.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveContracts(payload) {
	const { contracts } = payload;
	try {
		const { id } = contracts.id;
		contracts.active = !contracts.active
		const response = yield call(contractsApi.updateContracts, contracts, id);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getContracts(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do Contrato.',
				'error',
			),
		);
	}
}

export function* editContracts(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	try {
		const response = yield call(contractsApi.updateContracts, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Contrato editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/contracts');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar contrato.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteContracts(payload) {
	yield put(apiActions.apiStart());

	const id = payload.contracts;

	try {
		const response = yield call(contractsApi.deleteContracts, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Contrato deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getContracts(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar contrato.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchContracts() {
	yield takeLatest(types.GET_CONTRACTS, getContracts);
	yield takeLatest(types.INSERT_CONTRACTS, addContracts);
	yield takeLatest(types.ACTIVEDESACTIVE_CONTRACTS, activeDesactiveContracts);
	yield takeLatest(types.UPDATE_CONTRACTS, editContracts);
	yield takeLatest(types.DELETE_CONTRACTS, deleteContracts);
}
