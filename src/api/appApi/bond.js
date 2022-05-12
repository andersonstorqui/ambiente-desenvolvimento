import api from './api';

export const getBondContractClient = query => api.get('/bonds', {params: query});
export const insertBondContractClient = query => api.post('/bonds', query);
export const updateBondContractClient = query => api.put(`/bonds`, query);
export const deleteBondContractClient = query => api.delete(`/bonds/${query.id}`, query);