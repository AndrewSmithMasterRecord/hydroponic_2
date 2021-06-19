import {addError} from "../redux/errors/errorsReducer";


export const catchAsync = (dispatch: any, fetching: any, errorType: string, func: any ) => {
  func.catch( (error: any) => {
    dispatch(fetching(false));
    if(error.response)
      dispatch(addError({source: errorType, message: error.response.data.message}))

  })
}