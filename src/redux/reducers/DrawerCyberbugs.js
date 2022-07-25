import React from 'react';
import { OPEN_FORM_CREATE_USER, OPEN_FORM_EDIT_USER_INFO, SET_SUBMIT_CREATE_A_USER, SET_SUBMIT_EDIT_USER_INFO } from '../constants/UserConstants';

const initialState = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>default</p>,
    callBackSubmit: (propsValue) => { alert('click demo!') }
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT': {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }

        }
        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction;
            return { ...state };
        }
        case 'SET_SUBMIT_CREATE_TASK': {
            return { ...state, callBackSubmit: action.submitFunction }
        }
        case 'OPEN_FORM_CREATE_TASK': {
            state.visible = true;
            state.title = action.title;
            state.ComponentContentDrawer = action.Component;
            return { ...state };

        }
        case SET_SUBMIT_EDIT_USER_INFO:
            state.callBackSubmit = action.submitFunction;
            return { ...state }

        case SET_SUBMIT_CREATE_A_USER:
            state.callBackSubmit = action.submitFunction;
            return { ...state }

        case OPEN_FORM_EDIT_USER_INFO:
            state.visible = true;
            state.title = action.title;
            state.ComponentContentDrawer = action.Component;
            return { ...state }
        case OPEN_FORM_CREATE_USER:
            state.visible = true;
            state.title = action.title;
            state.ComponentContentDrawer = action.Component;
            return { ...state }

        default:
            return state
    }
}