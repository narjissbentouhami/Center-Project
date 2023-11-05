// const DEV_URL = 'http://localhost:8000'
const DEV_URL = 'http://localhost:8000'

export default {
  meEndpoint: `${DEV_URL}/auth/userInfo`,
  loginEndpoint: `${DEV_URL}/auth/login`,
  registerEndpoint: `${DEV_URL}/auth/signup`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
