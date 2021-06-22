import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/authenticationReducer";
import reduxThunk from "redux-thunk";
import {useDispatch} from "react-redux";
import errorsReducer from "./errors/errorsReducer";
import usersReducer from "./users/usersReducer";
import buttonsReducer from "./buttons/buttonsReducer";
import pumpReducer from "./pump/pumpReducer";
import drainPumpReducer from "./drainPump/drainPumpReducer";
import humidityReducer from "./humidity/humidityReducer";
import lightReducer from "./light/lightReducer";
import clockReducer from "./clock/clockReducer";
import flowReducer from "./flow/flowReducer";
import ventilationReducer from "./ventilation/ventilationReducer";


const reducer = {
  auth: authReducer,
  errors: errorsReducer,
  users: usersReducer,
  buttons: buttonsReducer,
  pump: pumpReducer,
  darin: drainPumpReducer,
  humidity: humidityReducer,
  light: lightReducer,
  clock: clockReducer,
  flow: flowReducer,
  ventilation: ventilationReducer
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