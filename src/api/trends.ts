import instance from "./instance";
import {IGetTrends} from "./types";

const trendsAPI = {
  getAll: async (): Promise<IGetTrends> => {
    try {
      const response =
          await instance.get<IGetTrends>("archive?date[gte]=2021-01-03&date[lte]=2021-01-04&limit=1000");
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  },
  getDay: async (date: Date): Promise<IGetTrends> => {
    try {
      let current = new Date(date);
      current.setHours(12);
      let currentDay = current.toISOString().match(/\d{4}-\d\d-\d\d/);
      current.setDate(current.getDate() + 1);
      let nextDay = current.toISOString().match(/\d{4}-\d\d-\d\d/);
      const response =
          await instance.get<IGetTrends>(`archive?date[gte]=${currentDay}&date[lte]=${nextDay}&limit=1000`);
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default trendsAPI;