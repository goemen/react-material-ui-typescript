import * as React from 'react';
import { Theme, withStyles, Avatar } from '@material-ui/core';
import { User } from '../../state/User';

interface IProfilePageProps {
    user: User;
    classes?: any;
}

class ProfilePage extends React.Component<IProfilePageProps, {}> {

    public render(): JSX.Element {
        
        const { classes, user } = this.props;
        return (
            <div className={classes.container}>
                {user.displayName}
                <Avatar className={classes.avatar} src='imgs/avatar.png'/>
            </div>
        )
    }
}

const styles: any = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
    avatar: {
        width: 100,
        height: 100
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    }),
    field: {
        marginTop: theme.spacing.unit * 3
    },
    actions: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    }),
    button: {
        marginRight: theme.spacing.unit
    },
});

export default withStyles(styles, { withTheme: true })(ProfilePage as any) as any;