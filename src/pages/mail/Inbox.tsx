import * as React from 'react'
import MailList from '../../components/MailList';
import { Paper, Typography, Theme, withStyles } from '@material-ui/core';

interface InboxProps {
    items: any[];
    classes: any;
}

class InboxPage extends React.Component<InboxProps, {}> {

    public render(): JSX.Element {
        const { classes } = this.props;
        console.log(classes)
        return (
            <Paper className={classes.root}>
                <Typography className={classes.boxHeader}>Inbox</Typography>
                <MailList {...this.props} />
            </Paper>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        width: '100%'
    },
    boxHeader: {
        padding: '5px 10px',
        fontSize: 35,
    },
});

export default withStyles(styles)(InboxPage as any) as any;