const backendPort = 3001; /*process.env.backend_port; todo fix later*/

const apiBaseUrl = `http://localhost:${backendPort}`;
const userApi = `${apiBaseUrl}/api/user`;
const singInApi = `${userApi}/signin`;
const registerApi = `${userApi}/register`;

const festivalApi = `${apiBaseUrl}/api/festival`;
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

module.exports = {
    backendPort,
    userApi,
    festivalApi,
    singInApi,
    registerApi,
    googleMapsApiKey
};
