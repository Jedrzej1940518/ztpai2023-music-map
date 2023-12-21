const backend_port = 3001; /*process.env.BACKEND_PORT; todo fix later*/

const apiBaseUrl = `http://localhost:${backend_port}`;
const userApi = `${apiBaseUrl}/api/user`;
const singInApi = `${userApi}/signin`;
const registerApi = `${userApi}/register`;

const festivalApi = `${apiBaseUrl}/api/festival`;

module.exports = {
    backend_port,
    userApi,
    festivalApi,
    singInApi,
    registerApi
};
