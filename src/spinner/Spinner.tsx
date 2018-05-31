import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles, CircularProgress, WithStyles } from '@material-ui/core';

const styles = (theme: any) => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    }
});

interface ISpinnerProps {
    message?: string;
    classes?: any;
}

class SpinnerDialog extends React.Component<ISpinnerProps & WithStyles<"progress">, {}> {

    public render() {
        return (

            <Dialog
                open={this.props.message !== null}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className={this.props.classes.content}>
                    <CircularProgress className={this.props.classes.progress} />
                    <DialogContentText id="alert-dialog-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        );
    }
}



export default withStyles(styles)(SpinnerDialog);
