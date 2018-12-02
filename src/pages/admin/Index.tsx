import * as React from 'react';
import { Switch, Route } from 'react-router';
import DashboardPage from './Dashboard';
import UserManagementPage from './Users';
import { DataState } from '../../state/DataState';
import { User } from '../../state/User';

interface IAdminProps {
    location?: any;
    fetchUsers: () => void;
    selectUser: (user?: User, index?: number) => void;
    deselectUser: () => void;
    setUserTablePage: (page: number) => void;
    setUserCustomClaims: (userId: string, claims: any) => void;
    editUser: (path: any, value: any) => void;
    users: DataState<User>;
    materialCharts: any;
}

export default class AdminPage extends React.Component<IAdminProps, {}> {
    private renderUserManagementPage = () => {
        return (
            <UserManagementPage
                fetchUsers={this.props.fetchUsers}
                users={this.props.users}
                location={this.props.location}
                selectUser={this.props.selectUser}
                deselectUser={this.props.deselectUser}
                setUserTablePage={this.props.setUserTablePage}
                setUserCustomClaims={this.props.setUserCustomClaims}
                editUser={this.props.editUser}
            />
        );
    }

    private renderDashboardPage = () => {
        return (
            <DashboardPage
                fetchUsers={this.props.fetchUsers}
                users={this.props.users.items.toList()}
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