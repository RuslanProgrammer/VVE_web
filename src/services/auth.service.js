import axios from 'axios';


const API_URL = 'http://127.0.0.1:8000/auth/';

// const API_URL = 'https://protected-meadow-53794.herokuapp.com/auth/';

class AuthService {
    loginAdministrator(user) {
        return axios
            .post(API_URL + 'administrator/login/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.access) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    loginWorker(user) {
        return axios
            .post(API_URL + 'worker/login/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.access) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    loginCustomer(user) {
        return axios
            .post(API_URL + 'customer/login/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.access) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    registerAdministrator(user) {
        return axios.post(API_URL + 'administrator/register/', {
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
            shop: user.shop,
        });
    }

    registerWorker(user) {
        return axios.post(API_URL + 'worker/register/', {
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
            shop: user.shop,
        });
    }

    registerCustomer(user) {
        return axios.post(API_URL + 'customer/register/', {
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
        });
    }
}

export default new AuthService();
