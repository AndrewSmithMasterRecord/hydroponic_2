export interface IBase {
  status: string,
  requestedAt?: Date;
  results?: number
}

export type user = {
  role: "admin" | "user",
  _id: String,
  name: string,
  __v?: Number
  active? : boolean,
  password?: String,
  passwordChangedAt?: Date
}

export interface ILoginAccepted extends IBase {
  token: String,
  data: {
    user: user
  }
}

export interface IError extends IBase {
  message: String
}

export type  loginData = {
  name: String,
  password: String
}

export interface IMe extends IBase{
  data: {
    data: user
  }
}

export type sendUserData = {
  name: String,
  role?: String,
  password: String,
  passwordConfirm: String
}
export interface ICreateUser extends IBase{
  data: user
}

export type trendsType = {
  date: Date;
  temperature: number;
  humidity: number;
  pH: number
}
export interface IGetTrends extends IBase{
data: {
  data: Array<trendsType>
}
}

