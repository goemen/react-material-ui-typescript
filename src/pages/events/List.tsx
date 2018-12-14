import * as React from 'react';
import { Theme, withStyles, Paper } from '@material-ui/core';

interface IListProps {
    match?: any;
    location?: any;
    classes: any;
}

class List extends React.Component<IListProps, {}> {


    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'List'}</h2>
                  
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

export default withStyles(styles as any, {withTheme: true})(List as any) as any;