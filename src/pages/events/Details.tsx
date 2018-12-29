
import * as React from 'react';
import {
    Typography, Card, CardHeader, Avatar, CardMedia, CardContent,
    CardActions, Theme, Grid, Paper, Tabs, Tab, List, ListItem, ListItemAvatar, ListItemText, Button, CircularProgress,
} from '@material-ui/core';
import { IEventSelect, formatDate, toggleGoing, reserveTicketsModalNote, reserveTicketsModalTitle } from '../../helpers/misc';
import Loading from '../../components/Loading';
import { Event } from '../../state/Event';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { Page, IAlertButtonOptions } from '../Page';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CasinoIcon from '@material-ui/icons/Casino';
import TimerIcon from '@material-ui/icons/Timer';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Authorize } from '../../decorators/Authorize';
import { User, ADMIN_ROLE } from '../../state/User';
import { CFAPI } from '../../helpers/cf_api';
import { green, orange } from '@material-ui/core/colors';
const classnames = require('classnames');

interface IDetailsProps {
    match?: any;
    changeSelection: (selection: IEventSelect) => void;
    toggleProgress: () => void;
    event: Event;
    classes: any;
    setTitle: (title: string) => void;
    auth: User;
    history: any;
    alert: (title: string, message: string, buttons: IAlertButtonOptions[], component: React.ComponentType) => void;
    dismissAlert: () => void;
}

interface IPageState {
    activeTab: number;
    reservationCount: number;
    processingReservation: boolean;
}

class Details extends Page<IDetailsProps, IPageState> {
    public state: IPageState = { activeTab: 0, reservationCount: 0, processingReservation: false };

    public componentWillMount() {
        super.componentWillMount();
        this.props.toggleProgress();
        const { id } = this.props.match.params;
        if (id) {
            this.props.changeSelection({ eventId: id });
        }
    }

    public componentDidUpdate() {
        if (this.props.event) {
            this.props.setTitle(this.props.event.title);
        }
    }

    public componentDidMount() {
        this.props.toggleProgress();
    }

    public handleTabChange = (event: any, tab: number) => this.setState({ activeTab: tab });

    private WhoIsGoing = () => {
        const { classes } = this.props;
        const users = this.props.event.attendancy.toList();
        return (<List dense className={classes.root}>
            {users.map(user => (
                <ListItem key={user.uid} button={true}>
                    <ListItemAvatar>
                        <Avatar
                            alt={user.displayName}
                            src={user.photoUrl}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={user.displayName} />
                </ListItem>
            ))}
        </List>);
    }

    @Authorize()
    private manageTicketReservations() {
        const {event} = this.props;
        const dismiss = () => {
            this.setState({ processingReservation: false });
            this.dismissAlert();
        }

        this.alert(reserveTicketsModalTitle, reserveTicketsModalNote(
            event.ticketsCountPerDraw || 0, event.nextDraw || new Date()), [
            { label: 'Cancel', handler: () => dismiss() },
            {
                label: 'Enter', handler: async () => {
                    this.setState({ processingReservation: true });
                    await CFAPI.enterTicketDraw(this.props.event.id);
                    this.setState({ processingReservation: false });
                    this.dismissAlert();
                }
            }
        ]);
    }

    @Authorize()
    private async going() {
        await toggleGoing(this.props.event);
    }

    @Authorize([ADMIN_ROLE])
    private delete() {
        this.alert(
            'Confirm',
            'Are you sure that want you to delete this event?', [
                { label: 'No', handler: () => this.dismissAlert() },
                {
                    label: 'Yes', handler: async () => {
                        this.dismissAlert();
                        await firebase.firestore().doc(`events/${this.props.event.id}`).delete();
                        this.props.history.push('/')
                    }
                }
            ]);
    }

    @Authorize([ADMIN_ROLE])
    private edit() {
        this.props.history.push('/events/edit/' + this.props.event.id);
    }

    private renderEventCard = () => {
        const user = firebase.auth().currentUser;
        const { classes, event } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label={event.createdBy.displayName} src={event.createdBy.photoUrl} className={classes.avatar} />
                    }

                    title={
                        <Typography variant='h6'>
                            {event.title}
                        </Typography>
                    }
                    subheader={<Typography variant='button' className={classnames( event.price ? classes.notfree : classes.free)}>{event.price ? `P${event.price}` : 'Free'}</Typography>}
                />
                <CardMedia
                    className={classes.media}
                    image={event.photo}
                    title={event.title}
                />
                <CardContent>
                    <Typography><b className={classes.highlight}>Where:</b> {event.location}</Typography>
                    <Typography><b className={classes.highlight}>When:</b> {formatDate(event.date)}</Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing={true}>
                    <Button onClick={this.going.bind(this)}>
                        <FavoriteIcon color={event.isUserGoing(user.uid) ? 'secondary' : 'inherit'} />
                        Like?
                </Button>
                {
                   event.ticketDrawable &&  (<div className={classes.btnWrapper}>

                        <Button aria-label="Draw" onClick={this.manageTicketReservations.bind(this)}>
                            <CasinoIcon className={classes.casino} />
                            Win tickets
                        </Button>
                        {this.state.processingReservation && <CircularProgress size={24} className={classes.buttonProgress} />}
                   </div> )}
                    {
                        this.getUser() &&

                        (
                            <Button aria-label="Delete" onClick={this.delete.bind(this)}>
                                <DeleteIcon color='error' />
                                Delete
                            </Button>
                        )
                    }{

                        this.getUser() &&

                        (
                            <Button aria-label="Edit" onClick={this.edit.bind(this)}>
                                <EditIcon color='primary' />
                                Edit
                            </Button>
                        )
                    }
                </CardActions>
                <CardContent>
                    <Typography variant='body2'>
                        {event.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    public renderReservationTimer() {
        const {auth, event} = this.props;

        if (!auth.ticketDraws.has(event.id)) {
            return (<Typography>Ticket reservation</Typography>);
        }

        return (<Typography>Ticket reservation Timer</Typography>);
    }

    public render(): JSX.Element {
        const { event } = this.props;
        if (!event) {
            return (<Loading />)
        }

        const { classes } = this.props;
        const { activeTab } = this.state;

        return (
            <div className={classes.container}>

                <Grid container={true}>
                    <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
                        {this.renderEventCard()}
                    </Grid>
                    <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div className={classes.more}>
                            <Paper square className={classes.root}>
                                <Tabs
                                    value={this.state.activeTab}
                                    onChange={this.handleTabChange}
                                    fullWidth
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                >
                                    <Tab icon={<GroupIcon />} label="WHO IS GOING?" />
                                    <Tab icon={<QuestionAnswerIcon />} label="FAQs" />
                                    {this.props.auth !== null && <Tab icon={<TimerIcon />} label="TICKET DRAW" />}
                                </Tabs>
                            </Paper>
                            {activeTab === 0 && (this.WhoIsGoing())}
                            {activeTab === 1 && (<Typography>Frequently asked questions</Typography>)}
                            {activeTab === 2 && (
                                <div className={classes.reservation}>
                                    {this.renderReservationTimer()}
                                </div>
                            
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        width: '100%',
        flexGrow: 1,
    },
    card: {
        width: '100%',
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    more: {
        width: '100%'
    },
    btnWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    reservation: {
        padding: 10
    },
    casino: {
        color: green['500']
    },
    free: {
        color: green['500']
    },
    notfree: {
        color: orange['500']
    }
});

export default withStyles(styles as any, { withTheme: true })(Details as any) as any;