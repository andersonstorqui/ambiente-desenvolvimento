import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as clientApi from '../../../api/appApi/Client';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getClient(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));
	try {
		const response = yield call(clientApi.getClient, query);

		yield put(actions.setClient(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Cliente.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addClient(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.client;

	try {
		const response = yield call(clientApi.insertClient, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Cliente adicionado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/client');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Cliente.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveClient(payload) {
	const { client } = payload;
	try {
		const data = {
			active: !client.active,
			id: client.id,
			client: client.client
		};
		
		const response = yield call(clientApi.updateClient, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getClient(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do Cliente.',
				'error',
			),
		);
	}
}

export function* editClient(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id;
	try {
		const response = yield call(clientApi.updateClient, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Cliente editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/client');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar cliente.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteClient(payload) {
	yield put(apiActions.apiStart());

	const id = payload.client;

	try {
		const response = yield call(clientApi.deleteClient, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Cliente deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getClient(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar Cliente.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchClient() {
	yield takeLatest(types.GET_CLIENT, getClient);
	yield takeLatest(types.INSERT_CLIENT, addClient);
	yield takeLatest(types.ACTIVEDESACTIVE_CLIENT, activeDesactiveClient);
	yield takeLatest(types.UPDATE_CLIENT, editClient);
	yield takeLatest(types.DELETE_CLIENT, deleteClient);
}
