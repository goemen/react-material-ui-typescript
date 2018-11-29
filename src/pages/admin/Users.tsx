import * as React from 'react';
import { Theme, withStyles, Typography } from '@material-ui/core';
import { DataState } from '../../state/DataState';

interface IUserManagementPageProps {
    fetchUsers: () => void;
    users?: DataState;
    location?: any;
    classes?: any;
}

class UserManagementPage extends React.Component<IUserManagementPageProps, {}> {
    public componentDidMount() {
        if (!this.props.users.loading && !this.props.users.doneLoading) { 
            this.props.fetchUsers(); 
        }
    }

    public render(): JSX.Element {
        return (
            <div className={this.props.classes.main}>
                <Typography>User management page</Typography>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    main: {
        display: 'flex'
    }
});

export default withStyles(styles as any)(UserManagementPage as any) as any;