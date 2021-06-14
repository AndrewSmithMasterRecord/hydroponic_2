import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/authenticationReducer";
import reduxThunk from "redux-thunk";
import {useDispatch} from "react-redux";
import errorsReducer from "./errors/errorsReducer";
import usersReducer from "./users/usersReducer";
import buttonsReducer from "./buttons/buttonsReducer";


const reducer = {
  auth: authReducer,
  errors: errorsReducer,
  users: usersReducer,
  buttons: buttonsReducer
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxThunk),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;