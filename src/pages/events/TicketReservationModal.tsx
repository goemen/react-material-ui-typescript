import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles, Theme, Paper, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Event } from '../../state/Event';

interface ITicketReservationModalProps {
    event: Event;
    open: boolean;
    classes: any;
    onClose: () => void;
}

class TicketReservationModal extends React.Component<ITicketReservationModalProps, {}> {
    public render(): JSX.Element {
        const { classes, open, event } = this.props;

        if (!event) {
            return null;
        }

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                disableBackdropClick={true}
                onClose={this.props.onClose}
            >
                <Paper className={classes.paper} elevation={24}>
                    <Typography variant='h6'>
                        Manage Ticket Reservation
            </Typography>
                    <Typography variant='subtitle2'>
                        {event.title}
            </Typography>
                <Typography>
                    You can reserve a maximim of 2 tickets and ticket reservations will expire within 2 hours if not claimed.
                </Typography>
                <FormControlLabel label={'Plus one?'} className={classes.field}
                            control = {<Checkbox/> }/>
                <div>
                    <Button onClick={this.props.onClose}>Close</Button>
                    <Button>Reserve</Button>
                </div>
                </Paper>
            </Modal>
        );
    }
}

const styles = (theme: Theme) => {
    return ({
        paper: {
            position: 'absolute',
            width: '50%',
            top: '25%',
            left: '25%',
            borderRadius: 0,
            boxShadow: theme.shadows[10],
            padding: theme.spacing.unit * 4,
            paddingBottom: theme.spacing.unit,
        },
        field: {
            width: '100%'
        }
    });
};
export default withStyles(styles as any, { withTheme: true })(TicketReservationModal as any) as any;