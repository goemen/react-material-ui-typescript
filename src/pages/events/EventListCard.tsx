import { Event } from "../../state/Event";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardActions, CardContent, Typography, Button } from "@material-ui/core";
import * as React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDate } from "../../helpers/misc";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

interface IEventCardProps {
    event: Event;
    classes: any;
    details: (id: string) => void;
    manageTicketReservations: (eventId: string) => void;
}
export default class EventListCard extends React.Component<IEventCardProps, {}> {

    private details = () => {
        this.props.details(this.props.event.id);
    }

    private going = async () => {
        const user = firebase.auth().currentUser;
        const eventDocRef = firebase.firestore().doc(`events/${this.props.event.id}`);
        try {
            await firebase.firestore().runTransaction(async (tx) => {
                const eventDoc = await tx.get(eventDocRef);
                if (!eventDoc.exists) {
                    throw new Error('Event does not exist.');
                }

                const data = eventDoc.data();
                const users = data.attendancy || {};
                if (users[user.uid]) {
                    delete users[user.uid];
                } else {
                    users[user.uid] = true;
                }
                return tx.update(eventDocRef, {attendancy: users});
            });
        } catch (error) {
            console.log(error);
        }
    }

    private manageTicketReservations = () => {
        this.props.manageTicketReservations(this.props.event.id);
    }

    public render() {
        const user = firebase.auth().currentUser || {} as any;
        const { event, classes } = this.props;
        return (<Card className={classes.card}>
            <CardHeader onClick={this.details}
                avatar={
                    <Avatar aria-label={event.createdBy.displayName} src={event.createdBy.photoUrl} className={classes.avatar}/>    
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }

                title={
                    <Typography variant='subtitle2'>
                        {event.title}
                    </Typography>
                    }
                subheader={`${event.price ? `P${event.price}` : 'Free'}` }
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
                    <FavoriteIcon color={event.isUserGoing(user.uid) ? 'secondary' : 'inherit' }/>
                    Like?
                </Button>
                <Button aria-label="Share" onClick={this.manageTicketReservations}>
                    Reserve tickets
                </Button>
            </CardActions>
        </Card>);
    }
}