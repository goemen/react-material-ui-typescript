import * as React from 'react';
import { User } from '../../state/User';
import { Theme, withStyles, Typography } from '@material-ui/core';

interface IUserManagementPageProps {
    fetchUsers: () => void;
    users?: User[];
    location?: any;
    classes?: any;
}

class UserManagementPage extends React.Component<IUserManagementPageProps, {}> {
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