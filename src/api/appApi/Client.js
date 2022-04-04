import api from './api';

export const getClient    = query => api.get('/client', {params: query});
export const insertClient = query => api.post('/client', query);
export const updateClient = query => api.put(`/client`, query);
export const deleteClient = query => api.delete(`/client/${query.id}`, query);