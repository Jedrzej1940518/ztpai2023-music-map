const port = process.env.BACKEND_PORT;

const userApi = `/api/user`;
const singInApi = `/signin`;

const festivalApi = `/api/festival`;

module.exports = {
    port,
    userApi,
    festivalApi,
    singInApi
};