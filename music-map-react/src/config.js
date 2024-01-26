const backendPort = 3001 // todo fix later process.env.BACKEND_PORT
const apiBaseUrl = `http://localhost:${backendPort}`
const userApi = `${apiBaseUrl}/api/user`
const singInApi = `${userApi}/signin`
const registerApi = `${userApi}/register`
const favoriteFestivalApi = `${userApi}/favorite`

const festivalApi = `${apiBaseUrl}/api/festival`
const festivalDateRangeApi = `${festivalApi}/dateRange`
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

module.exports = {
  backendPort,
  userApi,
  singInApi,
  registerApi,
  festivalApi,
  festivalDateRangeApi,
  googleMapsApiKey,
  favoriteFestivalApi
}
