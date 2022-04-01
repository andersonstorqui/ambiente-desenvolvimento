import api from './api';

export const getOperationSeg = query => api.get('/operation', {params: query});
export const insertOperationSeg = query => api.post('/operation', query);
export const updateOperationSeg = query => api.put(`/operation`, query);
export const deleteOperationSeg = query => api.delete(`/operation/${query.id}`, query);