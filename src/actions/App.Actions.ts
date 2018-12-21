import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';
import { Spinner } from '../state/Spinner';
import { User } from '../state/User';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Dispatch } from 'react-redux';
import { IRegisterModel, ILoginModel, IResetPasswordModel } from '../models';
import { CFAPI } from '../helpers/cf_api';
import { DataState } from '../state/DataState';
import { IEventProps } from './Event.Actions';

export interface IApplicationProps extends IEventProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;
    showPopup: (alert: Alert) => IAppAction;
    closePopup: () => IAppAction;
    showSpinner: (message: string) => IAppAction;
    hideSpinner: () => IAppAction;
    login: (data: any) => IAppAction;
    register: (data: IRegisterModel) => IAppAction;
    requestPasswordReset: (data: IResetPasswordModel) => IAppAction;
    logout: () => IAppAction;
    createUser: (content: any) => any;
    getUser: (id: any) => any;
    fetchUsers: () => any;
    selectUser: (user?: User, index?: number) => any;
    deselectUser: () => any;
    setUserTablePage: (page: number) => any;
    setUserCustomClaims: (userId: string, claims: any) => any;
    updateUser: (context: any) => any;
    deleteUser: (context: any) => any;
    createMaterial: (content: any) => any;
    getMaterial: (id: any) => any;
    fetchMaterials: (context?: any) => any;
    updateMaterial: (context: any) => any;
    deleteMaterial: (context: any) => any;
    getMail: (id: any) => any;
    fetchMails: (context?: any) => any;
    updateMail: (context: any) => any;
    deleteMail: (context: any) => any;
    match: match<any>;
    location: any;
    history: any;
    utility: Utility;
    authentication: User;
    users: DataState<User>;
    materials: any;
    mail: any[];
    materialCharts: Array<{ name: string, value: number, fill: string }>;
    toggleAnchor: (payload: any) => void;
    toggleNotification: (payload: any) => void;
    editUserSelection: (path: any, value: any) => void;
    toggleProgress: () => void;
  
}

export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};

export const showPopup = (data: Alert): IAppAction => {
    return {
        type: ActionType.OPEN_ALERT,
        payload: data
    };
};

export const closePopup = (): IAppAction => {
    return {
        type: ActionType.CLOSE_ALERT
    };
};

export const showSpinner = (message: string): IAppAction => {
    return {
        type: ActionType.OPEN_SPINNER,
        payload: new Spinner({ message })
    };
};

export const hideSpinner = (): IAppAction => {
    return {
        type: ActionType.CLOSE_SPINNER
    };
};

export const toggleProgress = () => {
    return {type: ActionType.TOGGLE_APP_LOADING};
}

export const login = (data: ILoginModel) => {

    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.LOGIN_REQUEST, payload: data });

        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            dispatch({ type: ActionType.LOGIN_SUCCESS, payload: 'Successfully logged in' });
        } catch (error) {
            dispatch({ type: ActionType.LOGIN_FAIL, payload: 'Login failed' });
        }
    };
};

export const requestPasswordReset = (data: IResetPasswordModel) => {

    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.RESET_PASSWORD_REQUEST, payload: data });

        try {
            await firebase.auth().sendPasswordResetEmail(data.email);
            dispatch({ type: ActionType.RESET_PASSWORD_SUCCESS, payload: 'Check your inbox and follow instructions to reset your password' });
        } catch (error) {
            dispatch({ type: ActionType.RESET_PASSWORD_FAIL, payload: { message: 'Failed to process your password reset request', error } });
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.LOGOUT_REQUEST });

        try {
            await firebase.auth().signOut();
            dispatch({
                type: ActionType.LOGOUT_SUCCESS,
                payload: 'Successfully logout.'
            });
        } catch (error) {
            dispatch({
                type: ActionType.LOGOUT_FAIL,
                payload: { message: 'Logout failed', error } });
        }
    };
};

export const register = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.REGISTER_REQUEST, payload: data });
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            await response.user.updateProfile({ displayName: data.displayName, photoURL: '' });
            const userInfo = {
                uid: response.user.uid,
                displayName: response.user.displayName,
                email: response.user.email,
                photoUrl: response.user.photoURL
            };

            await firebase.firestore().doc(`users/${userInfo.uid}`).set(userInfo);
            await response.user.sendEmailVerification();
            dispatch({ type: ActionType.REGISTER_SUCCESS, payload: { message: 'Successfully created an account. Check you inbox to verify your email address.' } });
        } catch (error) {
            dispatch({ type: ActionType.REGISTER_FAIL, payload: { errorMessage: 'Failed to register user.', error } });
        }
    };
};

export const fetchUsers = () => {
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.GET_USERS_REQUEST });
        try {
            const users = await CFAPI.getUsers();

            dispatch({ type: ActionType.GET_USERS_SUCCESS, payload: users });
        } catch (error) {
            dispatch({ type: ActionType.GET_USERS_FAIL, payload: { errorMessage: 'Failed to fetch user.', error } });
        }
    };
};

export const setUserCustomClaims = (userId: string, claims: any) => {
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.SET_USER_CLAIMS_REQUEST, payload: {userId, claims}});
        try {
            const response = await CFAPI.setUserCustomClaims(userId, claims);

            dispatch({ type: ActionType.SET_USER_CLAIMS_SUCCESS, payload: {userId, claims, response} });
        } catch (error) {
            dispatch({ type: ActionType.SET_USER_CLAIMS_FAIL, payload: { errorMessage: 'Failed to set user claims.', error } });
        }
    };
};

export const selectUser = (user?: User, index?: number): IAppAction => {
    return { type: ActionType.SELECT_USER, payload: { user, index} };
};

export const deselectUser = (): IAppAction => {
    return selectUser();
};

export const setUserTablePage = (page: number): IAppAction => {
    return { type: ActionType.SET_USER_TABLE_PAGE, payload: page};
}

export const toggleAnchor = (payload: any) => {
    return { type: ActionType.SET_ANCHOR_ELEMENT, payload };
}

export const toggleNotification = (payload: any) => {
    return { type: ActionType.SET_ANCHOR_ELEMENT, payload };
}

export const editUserSelection = (path: string, value: any) => {
    return { type: ActionType.EDIT_USER, payload:  {path, value}};
}


