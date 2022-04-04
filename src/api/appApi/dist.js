import api from './api';

export const getDist = query => api.get('/dist', {params: query});
export const insertDist = query => api.post('/dist', query);
export const updateDist = query => api.put(`/dist`, query);
export const deleteDist = query => api.delete(`/dist/${query.id}`, query);