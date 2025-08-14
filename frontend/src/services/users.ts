import api from "./api";

interface BodyInterface {
  loginParams: LoginParamsInterface
}

interface LoginParamsInterface {
  email: string,
  password: string
}

export const UserServices = {
  checkLogin: async (body: BodyInterface) => {
    const response = await api.post('/users/signin', JSON.stringify(body))
    return response.data
  },

  authCheck: async () => {
    const response = await api.post('/users/auth/me')
    if(response.status === 200) {
      return await response.data
    } else {
      return null
    }
  }
}