import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Utility } from './Utility';
import { Model } from './Helpers';
import { User, ADMIN_ROLE } from './User';
import { DataState } from './DataState';
import { Event } from './Event';
import { SearchQuery } from './SearchQuery';

export interface IAppState {
    utility?: Utility;
    authentication?: User;
    users?: DataState<User, any>;
    events?: DataState<Event, SearchQuery>
    materials?: any;
    mail?: any;
}

export const AppStateModel = Model<IAppState>({
    utility: new Utility(),
    authentication: null,
    users: new DataState<User, any>(),
    events: new DataState<Event, SearchQuery>(),
    materials: null,
    mail: null
});

export class AppState extends AppStateModel {
    public static UTILITY = 'utility';
    public static AUTHENTICATION = 'authentication';

    public utility: Utility;
    public authentication: User;
    public users: DataState<User, any>;
    public events: DataState<Event, SearchQuery>;
    public materials: any;
    public mail: any;
}

export const isAuthenticated = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.authentication !== null,
    wrapperDisplayName: 'Authenticated'
} as any) as any;

export const isAdmin = connectedRouterRedirect({
    redirectPath: '/account/login',
    authenticatedSelector: (state: AppState) => state.authentication !== null && state.authentication.isInRole(ADMIN_ROLE),
    wrapperDisplayName: 'Authenticated'
}) as any;
