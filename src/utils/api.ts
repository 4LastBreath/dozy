const API_DOMAIN = 'dozynodejs-fm9v49nn.b4a.run'
export const API_URL = `https://${API_DOMAIN}/api/v1`

export const API_ROUTES = {
  login: `${API_URL}/users/login`,
  signup: `${API_URL}/users/signup`,
  logout: `${API_URL}/users/logout`,
  forgotPassword: `${API_URL}/users/forgotPassword`,
  recoverAccount: `${API_URL}/users/recoverAccount`,
  resetPassword: (token?:string) => `${API_URL}/users/resetPassword/${token}`,
  activeAccount: (token?:string) => `${API_URL}/users/activeAccount/${token}`,
} as const