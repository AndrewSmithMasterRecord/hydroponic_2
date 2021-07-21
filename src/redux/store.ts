import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authentication/authenticationReducer";
import reduxThunk from "redux-thunk";
import {useDispatch} from "react-redux";
import errorsReducer from "./errors/errorsReducer";
import usersReducer from "./users/usersReducer";
import buttonsReducer from "./buttons/buttonsReducer";
import pumpReducer, {pumpGetViewAJAX} from "./pump/pumpReducer";
import drainPumpReducer, {drainGetViewAJAX} from "./drainPump/drainPumpReducer";
import humidityReducer, {humidityGetViewAJAX} from "./humidity/humidityReducer";
import lightReducer, {lightGetViewAJAX} from "./light/lightReducer";
import clockReducer, {clockGetViewAJAX} from "./clock/clockReducer";
import flowReducer, {flowGetViewAJAX} from "./flow/flowReducer";
import ventilationReducer, {ventGetViewAJAX} from "./ventilation/ventilationReducer";
import trendsReducer from "./trends/trendsReducer";


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
  ventilation: ventilationReducer,
  trends: trendsReducer
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxThunk),
  devTools: true
})


setInterval(() => {
  store.dispatch(pumpGetViewAJAX());
}, 500);

setInterval(() => {
  store.dispatch(drainGetViewAJAX());
}, 500);
setInterval(() => {
  store.dispatch(lightGetViewAJAX());
}, 500);

setInterval(() => {
  store.dispatch(ventGetViewAJAX());
}, 500);

setInterval(() => {
  store.dispatch(humidityGetViewAJAX());
}, 500);

setInterval(() => {
  store.dispatch(clockGetViewAJAX());
}, 500);
setInterval(() => {
  store.dispatch(flowGetViewAJAX(0));
  store.dispatch(flowGetViewAJAX(1));
}, 500);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;