import * as React from 'react';
import { Theme, withStyles, Avatar, Typography, Paper } from '@material-ui/core';
import { User } from '../../state/User';
import { Page } from '../Page';

interface IProfilePageProps {
    user: User;
    classes?: any;
    setTitle: (title: string) => void;
}

class ProfilePage extends Page<IProfilePageProps, {}> {

    public componentWillMount() {
        this.props.setTitle('My profile')
    }

    public render(): JSX.Element {

        const { classes, user } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar} src={user.photoUrl || 'imgs/avatar.png'} />
                </div>
                <Paper className={classes.detailsContainer}>
                    <Typography className={classes.infoTitle}>
                        {user.displayName}
                    </Typography>
                    <Typography variant='h6'>
                        {user.email}
                    </Typography>
                </Paper>
            </div>
        )
    }
}

const styles: any = (theme: Theme) => ({
    container: {
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
    avatar: {
        width: 100,
        height: 100
    },
    avatarContainer: {
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        [theme.breakpoints.up('md')]: {
            flex: .3,
        },
    },
    detailsContainer: {
        display: 'flex',
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flex: .7,
        },
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 25
    },
});

export default withStyles(styles, { withTheme: true })(ProfilePage as any) as any;