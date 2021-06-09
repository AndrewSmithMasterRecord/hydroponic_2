import {RootState} from "../store";


export const selectAllErrors = (state: RootState) => state.errors;
export const selectTypedErrors = (state: RootState, errorType: String) =>
    state.errors.errors.filter((value) => value.source == errorType);

