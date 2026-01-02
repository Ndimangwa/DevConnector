import {createSlice, nanoid} from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        alerts: [] /*[{id, msg, type, timeout}]*/
    },
    reducers: {
        addAlert: {
            reducer: (state, action) => {
                state.alerts.push(action.payload);
            },
            prepare: (msg, type, timeout=3000) => ({
                payload: {
                    id: nanoid(),
                    msg,
                    type,
                    timeout
                }
            })
        },
        removeAlert: (state, action) => {
            //on calling we will pass only id
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
        }
    }
});

export const {addAlert, removeAlert} = alertSlice.actions;
export default alertSlice.reducer;