import * as React from 'react';
import { List } from 'immutable';

import red from '@material-ui/core/colors/red';
import { Event } from '../../state/Event';
import EventListCard from './EventListCard';
import { Theme, withStyles } from '@material-ui/core';

interface IListProps {
    match?: any;
    history?: any;
    location?: any;
    classes: any;
    events: List<Event>;
}

class ListPage extends React.Component<IListProps, {}> {

    private navigate = (id: string) => {
        this.props.history.push(`/events/details/${id}`);
    }

    private get events(): JSX.Element {
        return (<div className={this.props.classes.cards}>
            {this.props.events.map(e => (
                <EventListCard
                    details={this.navigate}
                    key={e.id}
                    event={e}
                    classes={this.props.classes}
                />
            ))}
        </div>)
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                {this.events}
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'left',
        width: '100%'
    },
    card: {
        maxWidth: 400,
        minWidth: '24.01%',
        width: '24.01%',
        marginLeft: 13,
        marginBottom: 6,
        [theme.breakpoints.down('md')]: {
            minWidth: '48.3%',
            marginLeft: 0,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: '100%',
        }
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
        width: '100%'
    }
});

export default withStyles(styles as any, { withTheme: true })(ListPage as any) as any;