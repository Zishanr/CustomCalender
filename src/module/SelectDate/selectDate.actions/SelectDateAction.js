import { USER_SELECTED_DATE } from '../../../constants/ActionType';

export const userSelectedDate = () => {
    return {
        type: USER_SELECTED_DATE,
        payload: 'date'
    };
};