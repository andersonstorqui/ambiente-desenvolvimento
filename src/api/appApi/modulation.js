import api from './api';

export const getModulation = query => api.get('/modulation', {params: query});
export const insertModulation = query => api.post('/modulation', query);
export const updateModulation = query => api.put(`/modulation`, query);
export const deleteModulation = query => api.delete(`/modulation/${query.id}`, query);