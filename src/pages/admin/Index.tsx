import * as React from 'react';
import { Switch, Route } from 'react-router';
import DashboardPage from './Dashboard';
import UserManagementPage from './Users';
import { DataState } from '../../state/DataState';
import { User } from '../../state/User';
import { isAdmin } from '../../state/AppState';

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
    setTitle: (title: string) => void;
}

export default isAdmin(class AdminPage extends React.Component<IAdminProps, {}> {
    private renderUserManagementPage = (props: any) => {
        return (
            <UserManagementPage
            {...props}
                fetchUsers={this.props.fetchUsers}
                users={this.props.users}
                selectUser={this.props.selectUser}
                deselectUser={this.props.deselectUser}
                setUserTablePage={this.props.setUserTablePage}
                setUserCustomClaims={this.props.setUserCustomClaims}
                editUser={this.props.editUser}
                setTitle={this.props.setTitle}
            />
        );
    }

    private renderDashboardPage = (props: any) => {
        return (
            <DashboardPage
            {...props}
                fetchUsers={this.props.fetchUsers}
                users={this.props.users.items.toList()}
                materialChartData={this.props.materialCharts}
                setTitle={this.props.setTitle}
            />
        );
    }

    public render(): JSX.Element {
        return (
        <Switch>
            <Route path='/admin' exact={true} render={this.renderDashboardPage} />
            <Route path='/admin/dashboard' render={this.renderDashboardPage} />
            <Route path={'/admin/user-management'} render={this.renderUserManagementPage} />
        </Switch>);
    }
});

