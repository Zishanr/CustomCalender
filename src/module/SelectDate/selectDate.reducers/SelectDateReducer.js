import { USER_SELECTED_DATE } from '../../../constants/ActionType';


const INTIAL_STATE = {
    date : '',
}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case USER_SELECTED_DATE:
        return { ...state, date : action.payload};
        default:
            return state;
    }
}