import { Model } from "./Helpers";

interface IUserClaims {
    admin: boolean;
}

const UserClaimsModel = Model<IUserClaims> ({
    admin: false
});

export class UserClaims extends UserClaimsModel {
    public static ADMIN = 'admin';

    public admin: boolean;
}