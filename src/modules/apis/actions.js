import * as a from './actionTypes';
import * as apiMiddleware from '../../middleware/api';
import { RequestType } from '../../middleware/api/model';
import { Schemas } from '../../normalizer';

const API_URL = 'api';

export function load(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
      endpoint: API_URL,
      actionTypes: [a.LOAD, a.LOAD_SUCCESS, a.LOAD_ERROR],
      parameters: params,
      schema: Schemas.API_ARRAY,
      httpRequestType: RequestType.GET
    }));
  };
};

export function submitNewApi(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
      endpoint: API_URL,
      actionTypes: [a.SUBMIT, a.SUBMIT_SUCCESS, a.SUBMIT_ERROR],
      parameters: params,
      httpRequestType: RequestType.POST
    }));
  };
};

export function deleteApi(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
      endpoint: API_URL,
      actionTypes: [a.DELETE, a.DELETE_SUCCESS, a.DELETE_ERROR],
      parameters: params,
      httpRequestType: RequestType.DELETE
    }));
  };
}
