import api from './api';

export const getMonths = query => api.get('/months', {params: query});
export const insertMonths = query => api.post('/months', query);
export const updateMonths = query => api.put(`/months`, query);
export const deleteMonths = query => api.delete(`/months/${query.id}`, query);