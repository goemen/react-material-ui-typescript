import * as React from 'react'
import MailList from '../../components/MailList';
import { Paper, Typography, Theme, withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';

interface InboxProps {
    items: any[];
    classes: any;
}

class InboxPage extends React.Component<InboxProps, {}> {

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.boxHeader}>
                    <Typography className={classes.boxHeaderTitle}>Inbox</Typography>
                    <span className={classes.fillRemainingSpace}/>
                    <Button>Mark All As Read</Button>
                    <Button>Delete all</Button>
                </div>
                <MailList {...this.props} />
            </Paper>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
    },
    boxHeader: {
        width: '100%',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    boxHeaderTitle: {
        padding: '5px 10px',
        fontSize: 35,
    },
    fillRemainingSpace: {
        flex: '1 1 auto',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
});

export default withStyles(styles as any)(InboxPage as any) as any;