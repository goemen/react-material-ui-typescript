import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IAlertButtonOptions } from '../pages/Page';
import { Slide } from '@material-ui/core';
import { noop } from 'lodash';

interface IAlertProps {
    data: any;
    buttons?: IAlertButtonOptions[];
    handleClose: () => void;
    open: boolean;
}
export class AlertDialog extends React.Component<IAlertProps, {}> {

    public handleClose = () => {
        this.props.handleClose();
    };

    private renderButtons() {
        return (this.props.buttons || []).map((b: IAlertButtonOptions, index: number) => (
            <Button key={index} onClick={b.handler} color="primary">
                {b.label}
            </Button>
        ));
    }

    private Transition = (props: any) => {
        return (<Slide direction='up' {...props}/>);
    }

    public render() {
        
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={this.Transition}
                TransitionProps={{mountOnEnter: true, unmountOnExit: true, in: this.props.open}}
            >

                    <DialogTitle id="alert-dialog-title">{this.props.data.title || ''}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.data.message}
                        </DialogContentText>
                        {(this.props.data.contents || noop )()}
                    </DialogContent>
                    <DialogActions>
                        {this.renderButtons()}
                    </DialogActions>
            </Dialog>
        );
    }
}
