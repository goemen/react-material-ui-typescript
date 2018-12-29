import { Event } from "../../state/Event";
import { Card, CardHeader, Avatar, CardMedia, CardActions, CardContent, Typography, Button, CircularProgress } from "@material-ui/core";
import * as React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import DrawIcon from '@material-ui/icons/Casino';
import { formatDate, toggleGoing } from "../../helpers/misc";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const classnames = require('classnames');

interface IEventCardProps {
    event: Event;
    classes: any;
    details: (id: string) => void;
    manageTicketReservations: (eventId: string) => void;
    processingReservation: boolean;
}
export default class EventListCard extends React.Component<IEventCardProps, {}> {

    private details = () => {
        this.props.details(this.props.event.id);
    }

    private going = async () => {
        return await toggleGoing(this.props.event);
    }

    private manageTicketReservations = () => {
        this.props.manageTicketReservations(this.props.event.id);
    }

    public render() {
        const user = firebase.auth().currentUser || {} as any;
        const { event, classes, processingReservation } = this.props;
        return (<Card className={classes.card}>
            <CardHeader onClick={this.details}
                avatar={
                    <Avatar aria-label={event.createdBy.displayName} src={event.createdBy.photoUrl} className={classes.avatar} />
                }

                title={
                    <Typography variant='subtitle2'>
                        {event.title}
                    </Typography>
                }
                subheader={<Typography variant='button' className={classnames( event.price ? classes.notfree : classes.free)}>{event.price ? `P${event.price}` : 'Free'}</Typography>}
            />
            <CardMedia
                onClick={this.details}
                className={classes.media}
                image={event.photo}
                title={event.title}
            />
            <CardContent onClick={this.details}>
                <Typography><b className={classes.highlight}>Where:</b> {event.location}</Typography>
                <Typography><b className={classes.highlight}>When:</b> {formatDate(event.date)}</Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing={true}>
                <Button onClick={this.going}>
                    <FavoriteIcon color={event.isUserGoing(user.uid) ? 'secondary' : 'inherit'} />
                    Like?
                </Button>
                {
                    event.ticketDrawable &&

                    <div className={classes.btnWrapper}>
                        <Button aria-label="Reserve" onClick={this.manageTicketReservations}>
                            <DrawIcon className={classes.casino}/>
                            Win tickets
                    </Button>
                        {processingReservation && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                }
            </CardActions>
        </Card>);
    }
}