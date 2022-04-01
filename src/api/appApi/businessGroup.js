import api from './api';

export const getBusinessGroup = query => api.get('/business', {params: query});
export const insertBusinessGroup = query => api.post('/business', query);
export const updateBusinessGroup = query => api.put(`/business`, query);
export const deleteBusinessGroup = query => api.delete(`/business/${query.id}`, query);