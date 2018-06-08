import * as React from 'react';
import { User } from '../../state/User';
import LoginPage from './Login';
import { Route, Switch } from 'react-router';
import { ProfilePage } from './Profile';
import { isAuthenticated } from '../../state/AppState';

interface IAccountProps {
    login?: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

export class AccountPage extends React.Component<IAccountProps, {}> {
    private renderLogin = () => {
        return (
            <LoginPage
                user={this.props.user}
                login={this.props.login}
                match={this.props.match}
                location={this.props.location} />
        );
    }

    public render(): JSX.Element {
        return (<Switch>
            <Route path="/account" exact={true} component={isAuthenticated(ProfilePage as any)} />
            <Route path={'/account/login'} render={this.renderLogin} />
        </Switch>);
    }

}