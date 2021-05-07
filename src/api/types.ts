export interface IBase {
  status: String
}

export type user = {
  role: "Admin" | "user",
  _id: String,
  name: String,
  __v: Number
  active? : boolean,
  password?: String
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
  password: String,
  passwordConfirm: String
}
export interface ICreateUser extends IBase{
  data: user
}