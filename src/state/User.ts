import { Model } from './Helpers';
import * as _ from 'lodash';
import { UserClaims } from './Claims';
import { Map } from 'immutable';
import { TicketDraw } from './TicketDraw';

export const ADMIN_ROLE = 'Admin';

export interface IUser {
    displayName: string;
    email: string;
    photoUrl: string;
    uid: string;
    roles?: string[];
    claims?: UserClaims;
    ticketDraws?: Map<string, TicketDraw>;
}

const UserModel = Model<IUser>({
    displayName: null,
    email: null,
    photoUrl: null,
    uid: null,
    roles: null,
    claims: null,
    ticketDraws: Map<string, TicketDraw>()
});

export class User extends UserModel {
    public static UID = 'uid';
    public static EMAIL = 'email';
    public static DISPLAY_NAME = 'displayName';
    public static PHOTO_URL = 'photoUrl';
    public static ROLES = 'roles';
    public static CUSTOM_CLAIMS = 'claims';
    public static TICKET_DRAWS = 'ticketDraws';

    public uid: string;
    public email: string;
    public displayName: string;
    public roles: string[];
    public photoUrl: string;
    public claims: UserClaims;
    public ticketDraws: Map<string, TicketDraw>;

    public isInRole(candidate: string) {
        return this.hasRoles([candidate]);
    }
    
    public hasRoles(candidates: string[]): boolean {
        return _.intersection(this.roles, candidates).length > 0;
    }
}
