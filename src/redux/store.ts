import { configureStore } from "@reduxjs/toolkit";
import authReducer, {IAuthState} from "./authentication/authenticationReducer";
import reduxThunk from "redux-thunk";


const reducer = {
  auth: authReducer
}

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxThunk),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export default store;