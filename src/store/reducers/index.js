import { combineReducers } from 'redux';
import authReducer from '../ducks/auth';
import notificationReducer from '../ducks/notification';
import apiReducer from '../ducks/api';
import usersReducer from '../ducks/users';
import enterpriseReducer from '../ducks/enterprise';
import genericsReducer from '../ducks/generics';
import groupsReducer from '../ducks/groups';
import businessGroupReducer from '../ducks/businessGroup';
import operationSegReducer from '../ducks/operationSeg';
import distReducer from '../ducks/dist';
import clientReducer from '../ducks/client';
import merchantEnergyReducer from '../ducks/merchantEnergy';	
import modulationReducer from '../ducks/modulation';
import energyTypeReducer from '../ducks/energyType';
import contractsReducer from '../ducks/contracts';
import pricesReducer from '../ducks/prices';
import bondContractClientReducer from '../ducks/bondContractClient';

const rootReducer = combineReducers({
	auth: authReducer,
	notification: notificationReducer,
	api: apiReducer,
	user: usersReducer,
	enterprise: enterpriseReducer,
	generics: genericsReducer,
	group: groupsReducer,
	business: businessGroupReducer,
	segment: operationSegReducer,
	dist: distReducer,
	client: clientReducer,
	merchant: merchantEnergyReducer,
	modulation: modulationReducer,
	energy: energyTypeReducer,
	contracts: contractsReducer,
	prices: pricesReducer,
	bond: bondContractClientReducer
});

export default rootReducer;
