import * as React from 'react';
import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon, FormHelperText } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { IRegisterModel } from 'src/models';

interface IRegisterProps {
    register?: (data: IRegisterModel) => void;
    match?: any;
    location?: any;
    classes?: any;
}

interface IField {
    value: string;
    errorMessage?: string;
    dirty: boolean;
    hasError?: boolean;
}

interface IRegisterState {
    email: IField;
    password: IField;
    confirmPassword: IField;
}

class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
    public state = {
        email: {value: '', dirty: false} ,
        password: {value: '', dirty: false},
        confirmPassword: {value: '', errorMessage: '', dirty: false, hasError: false}
    };

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: { value: event.target.value, dirty: true }});
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: { value: event.target.value, dirty: true }})
    }

    private handleConfirmPasswordChange = (event: any) => {
        const value = event.target.value;
        if (value !== this.state.password.value) {
            this.setState({confirmPassword: {...this.state.confirmPassword, value, dirty: true, hasError: true, errorMessage: 'Password fields do not match!'}});
        } else {
            this.setState({confirmPassword: {...this.state.confirmPassword, value, dirty: true, errorMessage: null, hasError: false}});
        }        
    }

    private handleRegister = () => {
        this.props.register({email: this.state.email.value, password: this.state.password.value});
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Create account'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            defaultValue={this.state.email.value}
                            onChange={this.handleEmailAddressChange}
                            id="email"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>email</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            defaultValue={this.state.password.value}
                            onChange={this.handlePasswordChange}
                            type="password"
                            id="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>lock</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl error={this.state.confirmPassword.dirty && this.state.confirmPassword.hasError} required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="password">Confirm Password</InputLabel>
                        <Input
                            defaultValue={this.state.confirmPassword.value}
                            onChange={this.handleConfirmPasswordChange}
                            type="password"
                            id="confirmpassword"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>lock</Icon>
                                </InputAdornment>}
                        />
                        <FormHelperText>{this.state.confirmPassword.errorMessage}</FormHelperText>
                    </FormControl>
                    <div className={classes.actions}>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleRegister}
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

export default withStyles(styles, { withTheme: true })(RegisterPage as any) as any;

