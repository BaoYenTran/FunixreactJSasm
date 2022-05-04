//b3 tao cac actions de gui vo stores
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//fetch staffs from server
export const fetchStaffs = () => (dispatch) => {

  dispatch(staffsLoading(true));

  return fetch(baseUrl + 'staffs')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))//lay staffs tu server add vao cho MainComponent
    .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess
});
//goi ham addStaffs trong fetchStaffs
export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs
});

export const fetchDepartments = () => (dispatch) => {

  dispatch(departmentsLoading(true));

  return fetch(baseUrl + 'departments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(depts => dispatch(addDepts(depts)))//lay staffs tu server add vao cho MainComponent
    .catch(error => dispatch(staffsFailed(error.message)));
}

export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess
});

export const addDepts = (depts) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: depts
})