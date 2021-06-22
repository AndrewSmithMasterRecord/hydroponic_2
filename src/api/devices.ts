import instance from "./instance";

class devicesAPI {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  set newName(value: string){
    this.name = value;
  }
  async getView<T>(){
    try{
      let response = await instance.get<T>(`${this.name}/view`);
      return response.data;
    }catch (error) {
      return Promise.reject(error)
    }
  };
  async getControl<T>(){
    try{
      let response = await instance.get<T>(`${this.name}/control`);
      return response.data;
    }catch (error) {
      return Promise.reject(error)
    }
  };
  async getConfig<T>(){
    try{
      let response = await instance.get<T>(`${this.name}/config`);
      return response.data;
    }catch (error) {
      return Promise.reject(error)
    }
  };
  async setControlValue<T, P>(value: T){
    try{
      let response = await instance.patch<P>(`${this.name}/control`, value);
      return response.data;
    }catch (error) {
      return Promise.reject(error)
    }
  };
  async setConfigValue<T, P>(value: T){
    try{
      let response = await instance.patch<P>(`${this.name}/config`, value);
      return response.data;
    }catch (error) {
      return Promise.reject(error)
    }
  }
}

export default  devicesAPI;