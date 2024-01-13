import http from '../http-common';

class DataService {
    getAll() {
        return http.get('/products')
    }

    getByPk(id) {
        return http.get(`/products/${id}`)
    }

    create(data) {
        return http.post('/create', data)
    }

    update(id, data) {
        return http.put(`/dashboard-admin/edit/${id}`, data)
    }

    delete(id) {
        return http.delete(`/dashboard-admin/delete/${id}`);
    }
}

export default new DataService()