import * as React from 'react';
import { User } from '../../state/User';
import LoginPage from './Login';
import RegisterPage from './Register';
import { Route, Switch } from 'react-router';
import ProfilePage from './Profile';
// import { isAuthenticated } from '../../state/AppState';
import RequestPasswordReset from './RequestPasswordReset';
import { ILoginModel, IRegisterModel, IResetPasswordModel } from '../../models';
import { History } from 'history';

interface IAccountProps {
    login?: (data: ILoginModel) => void;
    register: (data: IRegisterModel) => void;
    requestPasswordReset: (data: IResetPasswordModel) => void;
    match?: any;
    location?: any;
    classes?: any;
    history?: History;
    user: User;
}

export class AccountPage extends React.Component<IAccountProps, {}> {
    private renderLogin = () => {
        return (
            <LoginPage
                user={this.props.user}
                login={this.props.login}
                match={this.props.match}
                history={this.props.history}
                location={this.props.location}
            />
        );
    }

    private renderRegister = () => {
        return (
            <RegisterPage
                register={this.props.register}
                match={this.props.match}
                location={this.props.location} />
        );
    }

    private renderRequestPasswordReset = () => {
        return (
            <RequestPasswordReset
                requestPasswordReset={this.props.requestPasswordReset}
                match={this.props.match}
                location={this.props.location} />
        );
    }

    private renderProfilePage = () => {
        return (
            <ProfilePage {...this.props}/>
        );
    }

    public render(): JSX.Element {
        return (<Switch>
            <Route path="/account" exact={true} component={this.renderProfilePage} />
            <Route path={'/account/login'} render={this.renderLogin} />
            <Route path={'/account/register'} render={this.renderRegister} />
            <Route path={'/account/request-password-reset'} render={this.renderRequestPasswordReset} />
        </Switch>);
    }

}