import instance from "./instance";
import {IGetAllUsers, IGetUserById, IuserChangePass, updateUser, updateUserPassword} from "./usersTypes";
import {IBase} from "./types";

const usersAPI = {
  getAll: async (): Promise<IGetAllUsers> => {
    try {
      const response = await instance.get<IGetAllUsers>("users");
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getById: async (id: String): Promise<IGetUserById> => {
    try {
      const response = await instance.get(`users/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error)
    }
  },
  updateById: async (id: String, payload: updateUser): Promise<IGetUserById> => {
    try {
      const response = await instance.patch(`users/${id}`, payload);
      return response.data;
    } catch (error) {
      return Promise.reject(error)
    }
  },
  deleteById: async (id: String): Promise<IBase> => {
    try {
      const response = await instance.delete(`users/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error)
    }
  },
  updatePassword: async (id: String, payload: updateUserPassword): Promise<IuserChangePass> => {
    try {
      const response = await instance.patch(`users/${id}/updatePassword`, payload);
      return response.data;
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default usersAPI;