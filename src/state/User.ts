import { Model } from './Helpers';
import * as _ from 'lodash';

export const ADMIN_ROLE = 'Admin';

export interface IUser {
    displayName: string;
    email: string;
    photoUrl: string;
    uid: string;
    roles?: string[];
}

const UserModel = Model<IUser>({
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null,
    roles: null
});

export class User extends UserModel {
    public static UID = 'uid';
    public static EMAIL = 'email';
    public static DISPLAY_NAME = 'displayName';
    public static PHOTO_URL = 'photoUrl';
    public static ROLES = 'roles';

    public uid: string;
    public email: string;
    public displayName: string;
    public roles: string[];
    public photoUrl: string;

    public isInRole(candidate: string) {
        return _.intersection(this.roles, [candidate]).length > 0;
    }
}
