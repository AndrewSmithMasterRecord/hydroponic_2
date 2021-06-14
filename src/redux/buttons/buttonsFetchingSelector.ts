import {buttonsStateType} from "./buttonsReducer";

export const filterButtonsFetching = (state: buttonsStateType, type: String) =>
    state.buttons.filter(item => item === type);