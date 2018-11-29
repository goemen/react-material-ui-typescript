import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Utility } from './Utility';
import { Model } from './Helpers';
import { User, ADMIN_ROLE } from './User';
import { IApplicationProps } from '../actions/App.Actions';
import { Map } from 'immutable';

export interface IAppState {
    utility?: Utility;
    authentication?: User;
    users?: Map<string, User>;
    materials?: any;
    mail?: any;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    authentication: null,
    users: null,
    materials: null,
    mail: null
});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';
    public static AUTHENTICATION = 'authentication';

    public utility: Utility;
    public authentication: User;
    public users: Map<string, User>;
    public materials: any;
    public mail: any;
}

export const isAuthenticated = connectedRouterRedirect<IApplicationProps, IAppState>({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.authentication !== null,
    wrapperDisplayName: 'Authenticated'
}) as any;

export const isAdmin = connectedRouterRedirect<IApplicationProps, IAppState>({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.authentication !== null && state.authentication.isInRole(ADMIN_ROLE),
    wrapperDisplayName: 'Authenticated'
}) as any;
