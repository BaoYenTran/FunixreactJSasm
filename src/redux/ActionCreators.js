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

// DELETE
export const deleteStaffSuccess = (id) => ({
  type: ActionTypes.DELETE_STAFF_SUCCESS,
  payload: id
});

export const deleteStaffLoading = () => ({
  type: ActionTypes.DELETE_STAFF_LOADING
});

export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Are you sure to delete this staff?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE"
    }).then(() => dispatch(deleteStaffSuccess(id)));
  } else return;
};

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

//buoc 1 tinh huong 5 addstaff dau tien tao action addstaff
// ADD STAFF


export const addStaffSuccess = (staff) => ({
  type: ActionTypes.ADD_STAFF_SUCCESS,
  payload: staff
});
export const addStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "POST",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addStaffSuccess(response)))
    .catch((error) => {
      console.log("Post staffs", error.message);
      alert("Your staff could not be posted\nError: " + error.message);
    });
};

//UPDATE STAFF , tao action de dispatch vao store roi truyen vao cho main component
export const updateStaffSuccess = (staff) => ({
  type: ActionTypes.UPDATE_STAFF_SUCCESS,
  payload: staff
});
export const updateStaff = (staff) => (dispatch) => {
  return fetch(baseUrl + "staffs", {
    method: "PATCH",
    body: JSON.stringify(staff),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaffSuccess(response)))//hoi
    .catch((error) => {
      console.log("Updated staffs", error.message);
      alert("Your staff could not be updated\nError: " + error.message);
    });
};
