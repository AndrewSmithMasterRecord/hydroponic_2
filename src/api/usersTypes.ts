import {IBase, user} from "./types";

export interface IGetAllUsers extends IBase {
  requestedAt: Date,
  results: Number,
  data: {
    data: Array<user>
  }
}

export interface IGetUserById extends IBase {
  data: {
    data: user
  }
}

export type updateUser = {
  name?: String,
  role? : "admin" | "user"
}

export type updateUserPassword = {
  newPassword: String,
  newPasswordConfirm: String
}

export interface IuserChangePass extends IBase{
  token: String,
  data: {
    user: user
  }
}
