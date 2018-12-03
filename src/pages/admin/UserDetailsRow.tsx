import { Button, Checkbox, FormControlLabel, FormGroup, Theme, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import { User } from '../../state/User';
import { UserClaims } from '../../state/Claims';

interface IProps {
    selectedUser: User;
    setUserCustomClaims: (userId: string, claims: any) => void;
    editUser: (path: any, value: any) => void;
    row: User;
    classes: any;
}

class RowDetail extends React.Component<IProps, {}> {

    private editClaims = (event: any) => {
        let claims = this.props.selectedUser.get(User.CUSTOM_CLAIMS);
        const editedClaim = event.target.value;
        claims = claims.set(editedClaim, !claims[editedClaim]);
        this.props.editUser(User.CUSTOM_CLAIMS, new UserClaims(claims));
    }

    private saveChanges = () => {
        const { selectedUser } = this.props;
        this.props.setUserCustomClaims(selectedUser.uid, selectedUser.claims.toJS());
    }

    public render(): JSX.Element {
        const { selectedUser, classes } = this.props;
        if (!selectedUser) {
            return null;
        }

        return (
            <div className={classes.container}>
                <Typography className={classes.title}>Edit claims</Typography>
                <div className={classes.claims}>
                    <FormGroup row={true}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={this.editClaims}
                                    checked={selectedUser.claims.admin}
                                    value='admin'
                                />
                            }
                            label='Administrator'
                        />
                    </FormGroup>
                </div>
                <Button size='small' color='primary' onClick={this.saveChanges}>Save</Button>
            </div>
        );
    }
}

const rowDetailStyle = (theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    claims: {
        display: 'flex',
        flexDirection: 'column',
        margin: 15,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export const RowDetailComponent = withStyles(rowDetailStyle as any)(RowDetail as any) as any;