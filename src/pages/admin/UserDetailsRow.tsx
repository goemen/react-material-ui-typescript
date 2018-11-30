import { Button, Checkbox, FormControlLabel, FormGroup, Theme, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import { User } from '../../state/User';

interface IProps {
    row: User;
    classes: any;
}

class RowDetail extends React.Component<IProps, {}> {

    public render(): JSX.Element {
        const { row, classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography className={classes.title}>Edit claims</Typography>
                <div className={classes.claims}>
                    <FormGroup row={true}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={row.claims.admin}
                                    value='admin'
                                />
                            }
                            label='Administrator'
                        />
                    </FormGroup>
                </div>
                <Button size='small' color='primary'>Save</Button>
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