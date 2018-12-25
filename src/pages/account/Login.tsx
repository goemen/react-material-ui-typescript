import * as React from 'react';
import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as querystring from 'querystring';
import { User } from '../../state/User';
import { Redirect } from 'react-router';
import { ILoginModel } from '../../models';
import { Location } from 'history';
import { Page } from '../Page';

interface ILoginProps {
    login?: (data: any) => void;
    match?: any;
    location?: Location;
    classes?: any;
    user: User;
    history: any;
    setTitle: (title: string) => void;
}

class LoginPage extends Page<ILoginProps, ILoginModel> {
    public state = {
        email: '',
        password: ''
    };

    public componentWillMount() {
        this.setTitle('Login');
    }

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: event.target.value })
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value })
    }

    private handleLogin = () => {
        this.props.login(this.state);
    }

    public goToPasswordReset = () => {
        this.props.history.push('/account/request-password-reset');
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (this.props.user) {
            const path: string = querystring.
                parse((this.props.location.search as string).substr(1)).redirect as any || '/inbox';
            return <Redirect to={path} />
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Login'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            value={this.state.email}
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
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            type="password"
                            id="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>lock</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                    <div className={classes.actions}>
                        <Button onClick={this.goToPasswordReset} variant="raised" className={classes.button}>
                            Forgot Password
                        </Button>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleLogin}
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

export default withStyles(styles, { withTheme: true })(LoginPage as any) as any;

