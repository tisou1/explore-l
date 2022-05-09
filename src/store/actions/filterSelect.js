
import types from '../types'

/** Wallet modal control
 * @param {*}
 */
 export const dispatchFilter = (info) => {
    return (dispatch) => {
        dispatch({type: types.FILTER_SELECT, info});
    };
};
