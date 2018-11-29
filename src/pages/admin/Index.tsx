import * as React from 'react';
import { Switch, Route } from 'react-router';
import DashboardPage from './Dashboard';
import UserManagementPage from './Users';
import { DataState } from '../../state/DataState';

interface IAdminProps {
    location?: any;
    fetchUsers: () => void;
    users: DataState;
    materialCharts: any;
}

export default class AdminPage extends React.Component<IAdminProps, {}> {
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
        return (
        <Switch location={this.props.location}>
            <Route path='/admin' exact={true} component={this.renderDashboardPage} />
            <Route path='/admin/dashboard' component={this.renderDashboardPage} />
            <Route path={'/admin/user-management'} component={this.renderUserManagementPage} />
        </Switch>);
    }
}