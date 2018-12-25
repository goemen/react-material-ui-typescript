import * as React from 'react';
import { List } from 'immutable';

import red from '@material-ui/core/colors/red';
import { Event } from '../../state/Event';
import EventListCard from './EventListCard';
import { Theme, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TicketReservationModal from './TicketReservationModal';
import { Page } from '../Page';

interface IListProps {
    match?: any;
    history?: any;
    location?: any;
    classes: any;
    events: List<Event>;
    toggleProgress: () => void;
    setTitle: (title: string) => void;
}


interface IState {
    reserveTicket: boolean;
    event: Event;
}

class ListPage extends Page<IListProps, IState> {
    public state: IState = {
        reserveTicket: false,
        event: null
    };
    public componentWillMount() {
        this.props.setTitle('Explore events')
        if (this.props.events.isEmpty()) {
            this.props.toggleProgress();
        }
    }

    private navigate = (id: string) => {
        this.props.history.push(`/events/details/${id}`);
    }

    private get events(): JSX.Element {
        return (<div className={this.props.classes.cards}>

            <Grid container={true} spacing={24}>

                {this.props.events.map(e => (

                    <Grid key={e.id} item={true} xs={12} sm={12} md={3} lg={3}>

                        <EventListCard
                            details={this.navigate}
                            event={e}
                            classes={this.props.classes}
                            manageTicketReservations={this.manageTicketReservations}
                        />
                    </Grid>
                ))}
            </Grid>

        </div>)
    }

    private closeTicketReservationModal = () => {
        this.setState({
            reserveTicket: false,
            event: null
        });
    }

    private manageTicketReservations = (id: string) => {
        this.setState({reserveTicket: true, event: this.props.events.find(x => x.id === id)});
    }


    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                {this.events}
                <TicketReservationModal
                    open={this.state.reserveTicket}
                    onClose={this.closeTicketReservationModal}
                    event={this.state.event}
                />
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'left',
        width: '100%',
        flexGrow: 1
    },
    card: {
        width: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
        alignItems: 'end'
    },
    highlight: {
        color: 'rgba(0, 0, 0, 0.7)'
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
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        flexGrow: 1
    }
});

export default withStyles(styles as any, { withTheme: true })(ListPage as any) as any;