import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '../state/Alert';

interface IAlertProps {
    data?: Alert;
    handleClose: () => void;
    children?: any;
}
export class AlertDialog extends React.Component<IAlertProps, {}> {

    public handleClose = () => {
        this.props.handleClose();
    };

    public render() {
        return (

            <Dialog
                open={this.props.data !== null}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.data.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    { this.props.data.message }
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
            </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus={true}>
                        Agree
            </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
