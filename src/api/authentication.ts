import instance from "./instance";
import {IBase, ICreateUser, ILoginAccepted, IMe, loginData, sendUserData} from "./types";

const authenticationAPI = {
  login: async (login: loginData): Promise<ILoginAccepted> => {
    try {
      const response = await instance.post<ILoginAccepted>("users/login", login);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async (): Promise<IBase> => {
    try {
      const response = await instance.get<IBase>("users/logout")
      return response.data
    } catch (error) {
      return Promise.reject(error);
    }
  },
  me: async (): Promise<IMe> => {
    try {
      const response = await instance.get<IMe>("users/me")
      return response.data
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createUser: async (user: sendUserData): Promise<ICreateUser> => {
    try {
      const response = await instance.post<ICreateUser>("users/createUser", user)
      return response.data
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default authenticationAPI;