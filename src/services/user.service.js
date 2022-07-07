import http from "../http-common";

class UserService {
    getAllCheckouts() {
        return http.get("/checkouts/");
    }

    getAllReservations() {
        return http.get("/reservations/");
    }

    getWorker(id) {
        return http.get(`/workers/${id}/`);
    }

    getShops() {
        return http.get(`/shops/`);
    }

    getFreeWorkersAndCurrent(id) {
        return http.get(`workers/getFreeWorkersAndCurrentByCheckout/${id}`);
    }

    getFreeWorkersByShopId(id) {
        return http.get(`shops/getFreeWorkers/${id}`);
    }

    getAllWorkers() {
        return http.get("/workers/");
    }

    getCheckout(id) {
        return http.get(`/checkouts/${id}/`);
    }

    getReservation(id) {
        return http.get(`/reservations/${id}/`);
    }

    getReservationByCustomer(id) {
        return http.get(`/customers/reservations/${id}`);
    }

    getSituation(id) {
        return http.get(`/shops/getSituation/${id}`);
    }

    createCheckout(data) {
        return http.post("/checkouts/", data);
    }

    createReservation(data) {
        return http.post("/reservations/", data);
    }

    updateCheckout(id, data) {
        return http.put(`/checkouts/${id}/`, data);
    }

    updateReservation(id, data) {
        return http.put(`/reservations/${id}/`, data);
    }

    deleteCheckout(id) {
        return http.delete(`/checkouts/${id}/`);
    }

    deleteReservation(id) {
        return http.delete(`/reservations/${id}/`);
    }

    getShop(id) {
        return http.get(`/shops/${id}/`);
    }

    getShopsTime() {
        return http.get(`/shops/getAllTime`);
    }

    createBackup() {
        return http.get(`/backups/create/`);
    }

    getBackups() {
        return http.get(`/backups/get/`);
    }

    restoreBackups(id) {
        return http.get(`/backups/restore/${id}/`)
    }
}

export default new UserService();
