import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as bondApi from '../../../api/appApi/bond';
import { notificationActions } from '../notification';
import * as actions from './actions';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as selectors from './selectors';
import { navigate } from '../../../lib/utils/navigation';


export function* getBonds(payload) {
	const refresh = yield select(selectors.getRefresh);
	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	let { query } = payload;

	yield put(apiActions.setQueryFilter(query));

	try {
		const response = yield call(bondApi.getBondContractClient, query);

		yield put(actions.setBondContractClient(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar Vinculos.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
}

export function* addBonds(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.bond;
	data.active = data.active == null ? true : data.active;

	try {
		const response = yield call(bondApi.insertBondContractClient, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Vinculo cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/bond');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar vinculo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveBond(payload) {
	const { bond } = payload;
	try {
		bond.active = !bond.active

		const response = yield call(bondApi.updateBondContractClient, bond);

		if (response) {
			const query = yield select(apiSelectors.getQuery);

			yield put(actions.setRefresh(true));

			yield put(actions.getBondContractClient(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do vinculo.',
				'error',
			),
		);
	}
}

export function* editBond(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.query;
	const { id } = payload;
	data.id = id ;
	data.active = data.active == null ? true : data.active;
	
	console.log(payload)
	try {
		const response = yield call(bondApi.updateBondContractClient, data, id);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Vinculo editado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/bond');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar vinculo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* deleteBond(payload) {
	yield put(apiActions.apiStart());

	const id = payload.bond;
	try {
		const response = yield call(bondApi.deleteBondContractClient, { id: id });

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Vinculo deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getBondContractClient(query));
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar vinculo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}


export default function* watchBondContractClient() {
	yield takeLatest(types.GET_BOND_CONTRACT_CLIENT, getBonds);
	yield takeLatest(types.INSERT_BOND_CONTRACT_CLIENT, addBonds);
	yield takeLatest(types.ACTIVEDESACTIVE_BOND_CONTRACT_CLIENT, activeDesactiveBond);
	yield takeLatest(types.UPDATE_BOND_CONTRACT_CLIENT, editBond);
	yield takeLatest(types.DELETE_BOND_CONTRACT_CLIENT, deleteBond);
}
