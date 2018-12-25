import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, Theme, Paper, Button, IconButton } from '@material-ui/core';

interface IEventSearchModalProps {
    open: boolean;
    classes: any;
    onClose: () => void;
}

class EventSearchModal extends React.Component<IEventSearchModalProps, {}> {
    public render(): JSX.Element {
        const { classes, open } = this.props;

        return (
            <Modal
                aria-labelledby="Search"
                aria-describedby="simple-modal-description"
                open={open}
                disableBackdropClick={true}
                onClose={this.props.onClose}
            >
                <Paper className={classes.paper} elevation={0}>
                    <div className={classes.bar}>
                        <Typography variant='h5'>
                            Search
                        </Typography>
                        <span className={classes.bar}></span>
                        <IconButton onClick={this.props.onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div>
                        <Button onClick={this.props.onClose}>Close</Button>
                        <Button>Submit</Button>
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
            padding: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit,
            paddingTop: 0,
        },
        field: {
            width: '100%'
        },
        bar: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        fillSpace: {
            flex: '1 1 auto'
        }
    });
};
export default withStyles(styles as any, { withTheme: true })(EventSearchModal as any) as any;