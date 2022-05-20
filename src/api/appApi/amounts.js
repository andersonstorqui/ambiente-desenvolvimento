import api from './api';

export const getAmounts = query => api.get('/amounts', {params: query});
export const insertAmounts = query => api.post('/amounts', query);
export const updateAmounts = query => api.put(`/amounts`, query);
export const deleteAmounts = query => api.delete(`/amounts/${query.id}`, query);