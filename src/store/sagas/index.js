import { fork } from 'redux-saga/effects';
import watchUserAuthentication from '../ducks/auth/sagas';
import watchUsers from '../ducks/users/sagas';
import watchGroups from '../ducks/groups/sagas';
import watchEnterprise from '../ducks/enterprise/sagas';
import watchGenerics from '../ducks/generics/sagas';
import watchBusinessGroup from '../ducks/businessGroup/sagas';
import watchOperationSeg from '../ducks/operationSeg/sagas';
import watchDist from '../ducks/dist/sagas';
import watchClient from '../ducks/client/sagas';
import watchMerchantEnergy from '../ducks/merchantEnergy/sagas';
import watchModulation from '../ducks/modulation/sagas';
import watchEnergyTypes from '../ducks/energyType/sagas';

export default function* startForman() {
	yield fork(watchUserAuthentication);
	yield fork(watchUsers);
	yield fork(watchGroups);
	yield fork(watchEnterprise);
	yield fork(watchGenerics);
	yield fork(watchBusinessGroup);
	yield fork(watchOperationSeg);
	yield fork(watchDist);
	yield fork(watchClient);
	yield fork(watchMerchantEnergy);
	yield fork(watchModulation);
	yield fork(watchEnergyTypes);
}
