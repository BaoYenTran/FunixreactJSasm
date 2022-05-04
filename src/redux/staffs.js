//b4 tao reducer de change state of store
import * as ActionTypes from './ActionTypes';//2


export const Staffs = (state = { 
    isLoading: true,
    errMess: null,
    staffs:[]
},  action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};//dishes = Dishes.state hoi cho nay vi sao ...state ROI LAI ISLOADING BI TRUNG THI SAO
        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}