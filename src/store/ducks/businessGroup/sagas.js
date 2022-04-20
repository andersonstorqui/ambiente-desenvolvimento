import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as businessGroupApi from '../../../api/appApi/businessGroup';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';



export function* getBusinesGroup(payload) {
	const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(businessGroupApi.getBusinessGroup, query);

		yield put(actions.setBusinessGroup(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Grupos.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addBusinessGroup(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.group;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(businessGroupApi.insertBusinessGroup, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/business-group');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveGroup(payload) {
	const { group } = payload;
	try {
		const data = {
			active: !group.active,
			id: group.id,
			group: group.group
		};

		const response = yield call(businessGroupApi.updateBusinessGroup, data);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getBusinesGroup(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do grupo.',
				'error',
			),
		);
	}
}

export function* editBusinessGroup(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id ;
	data.active = data.active == null ? true : data.active;
	
	try {
		const response = yield call(businessGroupApi.updateBusinessGroup, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/business-group');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteBusinessGroup(payload) {
	yield put(apiActions.apiStart());

	const id = payload.group;

	try {
		const response = yield call(businessGroupApi.deleteBusinessGroup, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Grupo deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getBusinesGroup(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchBusinessGroup() {
	yield takeLatest(types.GET_BUSINESS_GROUP, getBusinesGroup);
	yield takeLatest(types.INSERT_BUSINESS_GROUP, addBusinessGroup);
	yield takeLatest(types.ACTIVEDESACTIVE_BUSINESS_GROUP, activeDesactiveGroup);
	yield takeLatest(types.UPDATE_BUSINESS_GROUP, editBusinessGroup);
	yield takeLatest(types.DELETE_BUSINESS_GROUP, deleteBusinessGroup);
}
