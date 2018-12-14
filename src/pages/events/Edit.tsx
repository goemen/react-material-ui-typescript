import * as React from 'react';
import { Theme, withStyles, Paper, FormControl, InputLabel, Input, InputAdornment, Icon, Button } from '@material-ui/core';
import { Event } from '../../state/Event';

interface IEditProps {
    match?: any;
    location?: any;
    save?: (event: Event) => void;
    edit?: (property: string, value: any) => void;
    classes: any;
    event: Event;
}

class Edit extends React.Component<IEditProps, {}> {


    public render(): JSX.Element {
        const classes = this.props.classes;

        if (!this.props.event) {
            return null;
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Edit event'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            defaultValue={this.props.event.title}
                            id="email"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>email</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                   
                    <div className={classes.actions}>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            variant="raised"
                            color="primary"
                            className={classes.button}>
                            Submit
                        </Button>
                    </div>
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

export default withStyles(styles as any, {withTheme: true})(Edit as any) as any;