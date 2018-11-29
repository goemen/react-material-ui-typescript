import * as React from 'react';
import { IApplicationProps } from '../../actions/App.Actions';
import { Switch, Route } from 'react-router';
import { isAuthenticated } from '../../state/AppState';
import DashboardPage from './Dashboard';
import UserManagementPage from './Users';

export default class AdminPage extends React.Component<IApplicationProps, {}> {
    private renderUserManagementPage = () => {
        return (
            <UserManagementPage
                fetchUsers={this.props.fetchUsers}
                users={this.props.users}
                location={this.props.location}
            />
        );
    }

    private renderDashboardPage = () => {
        return (
            <DashboardPage
                fetchUsers={this.props.fetchUsers}
                users={this.props.users}
                materialChartData={this.props.materialCharts}
            />
        );
    }

    public render(): JSX.Element {
        return (<Switch>
            <Route path='/admin' exact={true} component={isAuthenticated(this.renderDashboardPage)} />
            <Route path='/admin/dashboard' component={isAuthenticated(this.renderDashboardPage)} />
            <Route path={'/admin/user-management'} component={isAuthenticated(this.renderUserManagementPage)} />
        </Switch>);
    }

}