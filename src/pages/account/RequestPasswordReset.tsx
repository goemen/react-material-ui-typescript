import * as React from 'react';
import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { User } from '../../state/User';
import { IResetPasswordModel } from '../../models';

interface IRequestPasswordResetProps {
    requestPasswordReset: (data: IResetPasswordModel) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

class RequestPasswordResetPage extends React.Component<IRequestPasswordResetProps, IResetPasswordModel> {
    public state = {
        email: '',
    };

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: event.target.value })
    }

    private submit = () => {
        this.props.requestPasswordReset(this.state);
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Request Password Reset'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            defaultValue={this.state.email}
                            onChange={this.handleEmailAddressChange}
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
                            onClick={this.submit}
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

export default withStyles(styles, { withTheme: true })(RequestPasswordResetPage as any) as any;

