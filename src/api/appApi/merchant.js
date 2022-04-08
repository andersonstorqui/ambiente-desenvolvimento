import api from './api';

export const getMerchantEnergy = query => api.get('/merchant', {params: query});
export const insertMerchantEnergy = query => api.post('/merchant', query);
export const updateMerchantEnergy = query => api.put(`/merchant`, query);
export const deleteMerchantEnergy = query => api.delete(`/merchant/${query.id}`, query);