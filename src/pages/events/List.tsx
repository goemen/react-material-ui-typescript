import * as React from 'react';
import { List } from 'immutable';

import red from '@material-ui/core/colors/red';
import { Event } from '../../state/Event';
import EventListCard from './EventListCard';
import { Theme, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Page, IAlertButtonOptions } from '../Page';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import EventSearchModal from './EventSearchModal';
import { User } from '../../state/User';
import { Authorize } from '../../decorators/Authorize';
import { CFAPI } from '../../helpers/cf_api';
import green from '@material-ui/core/colors/green';
import { reserveTicketsModalTitle, reserveTicketsModalNote } from '../../helpers/misc';
import { orange } from '@material-ui/core/colors';
import { SearchQuery, ISearchQuery } from '../../state/SearchQuery';
import * as firebase from 'firebase';

interface IListProps {
    match?: any;
    history: any;
    location?: any;
    classes: any;
    events: List<Event>;
    toggleProgress: () => void;
    setTitle: (title: string) => void;
    auth: User;
    alert: (title: string, message: string, buttons: IAlertButtonOptions[], contents?: React.ComponentType, fullscreen?: boolean) => void;
    dismissAlert: () => void;
    setQuery: (query: SearchQuery) => void;
    query: SearchQuery;
}

interface IReservation {
    eventId?: string;
    count?: number;
    processing?: boolean;
}

interface IState {
    reserveTicket: IReservation;
    event: Event;
    openSearch: boolean;
    query: ISearchQuery
}

class ListPage extends Page<IListProps, IState> {
    constructor(props: IListProps) {
        super(props);
        this.state = {
            reserveTicket: {},
            openSearch: false,
            event: null,
            query: (new SearchQuery()).toJS()
        };
    }
   
    public componentWillMount() {
        this.props.setTitle('Explore events')
        if (this.props.events.isEmpty()) {
            this.props.toggleProgress();
        }
    }

    public componentDidMount() {
        const { query } = this.props;
        if (query) {
            this.setState({query: query.toJS()});
        }
    }

    public async componentWillUnmount() {
        const { query } = this.props;
        const disabledQuery = query.set(SearchQuery.APPLY, false) as SearchQuery;
        try {
            await this.updateQuery(disabledQuery);
        } catch (error) {
            console.log('Error: ' + error);
        } finally {
            this.props.setQuery(disabledQuery);
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
                            processingReservation={this.state.reserveTicket.eventId === e.id && this.state.reserveTicket.processing}
                            manageTicketReservations={this.manageTicketReservations.bind(this, e.id)}
                        />
                    </Grid>
                ))}
            </Grid>

        </div>)
    }

    private onSearchChange = (field: string, value: any) => {
        const query = this.state.query;
        query[field] = value;
        this.setState({query});
    }

    private applyQuery = async () => {
        try {
            const query = new SearchQuery({...this.state.query, apply: true});
            this.setState({query: query.toJS()});
            this.props.setQuery(query);
            await this.updateQuery(query);
            this.dismissAlert();
        } catch (error) {
            this.error('Failed to apply query. Please try again');
        }
    }

    private updateQuery = async (query: SearchQuery) => {
        if (this.props.auth) {
            try {
                const userRef = firebase.firestore().collection('users').doc(this.props.auth.uid);
                const data = {};
                data[User.SEARCH_QUERY] = query.saveable;
                await userRef.update(data);
            } catch (error) {
                throw new Error('Failed to update query');
            }
        }
    }

    private openSearchModal = () => {
        this.alert(
            'Search',
            '',
            [
                {label: 'Dismiss', handler: () => this.dismissAlert()},
                {label: 'Apply', primary: true, handler: () => this.applyQuery()}
            ],
            () => (<EventSearchModal
                query={this.state.query}
                onChange={this.onSearchChange}
            />),
            {fullscreen: true, searchable: true}
        );
    }

    @Authorize()
    private manageTicketReservations(id: string) {

        const clearReservation = () => {
            this.setState({
                reserveTicket: {
                    eventId: null,
                    count: null,
                    processing: null
                }
            });
        }

        this.alert(reserveTicketsModalTitle,
            reserveTicketsModalNote(this.props.events.find(x => x.id === id).ticketsCountPerDraw),
            [
                {
                    label: 'Cancel', handler: () => {
                        clearReservation();
                        this.dismissAlert();
                    }
                },
                {
                    label: 'Enter', handler: async () => {
                        this.dismissAlert();
                        this.setState({ reserveTicket: { ...this.state.reserveTicket, processing: true } });
                        await CFAPI.enterTicketDraw(id);
                        clearReservation();
                    }
                }
            ]);
    }


    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <Fab onClick={this.openSearchModal} color="secondary" aria-label="search" className={classes.fab}>
                    <SearchIcon />
                </Fab>
                {this.events}
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'left',
        width: '100%',
        flexGrow: 1,
        position: 'relative'
    },
    fab: {
        position: 'fixed',
        top: theme.spacing.unit * 10,
        right: theme.spacing.unit * 2,
        zIndex: 1000
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

export default withStyles(styles as any, { withTheme: true })(ListPage as any) as any;