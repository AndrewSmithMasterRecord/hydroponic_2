import {createAction, createReducer} from "@reduxjs/toolkit";
import {IGetTrends, trendsType} from "../../api/types";
import {AppDispatch} from "../store";
import trendsAPI from "../../api/trends";
import {addError, ERRORS_TRENDS} from "../errors/errorsReducer";

export type trendStateType = {
  data: Array<trendsType>,
  dataCounter: number,
  isFetching: boolean
}


const setTrends = createAction<IGetTrends>("trends/set");
const setFetching = createAction<boolean>("trends/setFetching");

const initialState: trendStateType = {
  data: [],
  dataCounter: 0,
  isFetching: false
}

const trendsReducer = createReducer(initialState, builder => {
  builder.addCase(setTrends, (state, action) => {
    state.data = action.payload.data.data;
    if (action.payload.results)
      state.dataCounter = action.payload.results
  })
      .addCase(setFetching, (state, action) => {
        state.isFetching = action.payload
      })
})

export const getTrendsAJAX = (data: Date) => async (dispatch: AppDispatch) => {
  try{
    dispatch(setFetching(true));
    const response = await trendsAPI.getDay(data);
    dispatch(setTrends(response));
    dispatch(setFetching(false));
  }catch (error){
    dispatch(setFetching(false));
    dispatch(addError({source: ERRORS_TRENDS, message: error.response.data.message}));
  }
}


export default trendsReducer;