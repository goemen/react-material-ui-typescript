import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IAlertButtonOptions } from '../pages/Page';
import { Slide, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { noop } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';

interface IAlertProps {
    data: any;
    buttons?: IAlertButtonOptions[];
    handleClose: () => void;
    open: boolean;
    fullscreen?: boolean;
    searchable?: boolean;
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
        return (<Slide direction='up' {...props} />);
    }

    private renderHeader() {

        const primaryButton = (this.props.buttons || []).find(x => x.primary === true);

        if (!this.props.fullscreen) {
            return (<DialogTitle id="alert-dialog-title">{this.props.data.title || ''}</DialogTitle>);
        } else {
            return (<AppBar style={{position: 'relative', marginBottom: 10}}>
                <Toolbar>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                        {this.props.data.title || ''}
                    </Typography>
                    {primaryButton !== null && <Button color="inherit" onClick={primaryButton.handler}>
                        {primaryButton.label}
                    </Button>}
                </Toolbar>
            </AppBar>);
        }
    }

    public render() {

        return (
            <Dialog
                open={this.props.open}
                fullScreen={this.props.fullscreen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={this.Transition}
                TransitionProps={{ mountOnEnter: true, unmountOnExit: true, in: this.props.open }}
            >

                {this.renderHeader()}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.data.message}
                    </DialogContentText>
                    {(this.props.data.contents || noop)()}
                </DialogContent>
                <DialogActions>
                    {this.renderButtons()}
                </DialogActions>
            </Dialog>
        );
    }
}
