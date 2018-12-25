import * as React from 'react';
import { Theme, withStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Page } from './Page';
import ErrorIcon from '@material-ui/icons/Error';
import red from '@material-ui/core/colors/red';

interface INotFoundProps {
    setTitle: (title: string) => void;
    classes: any;
}

class NotFoundPage extends Page<INotFoundProps, {}> {

    public componentWillMount() {
        this.setTitle('Not found');
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <ErrorIcon color='error' className={classes.icon}/>
                   <Typography variant={'headline'}>
                       Page not found. 
                   </Typography>
                </Paper>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    icon: {
        color: red,
        marginRight: 10
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    })
});

export default withStyles(styles as any, { withTheme: true })(NotFoundPage as any) as any;

