
import * as React from 'react';
import { Typography, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Theme } from '@material-ui/core';
import { IEventSelect, formatDate } from 'src/helpers/misc';
import Loading from 'src/components/Loading';
import { Event } from '../../state/Event';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
const classnames = require('classnames');
import red from '@material-ui/core/colors/red';

interface IDetailsProps {
    match?: any;
    changeSelection: (selection: IEventSelect) => void;
    toggleProgress: () => void;
    event: Event;
    classes: any;
}

class Details extends React.Component<IDetailsProps, {}> {

    public componentWillMount() {
        this.props.toggleProgress();
        const { id } = this.props.match.params;
        if (id) {
            this.props.changeSelection({ eventId: id });
        }
    }

    public componentDidMount() {
        this.props.toggleProgress();
    }

    public render(): JSX.Element {
        const { event } = this.props;
        if (!event) {
            return (<Loading />)
        }

        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar 
                        src={event.createdBy.photoUrl}
                        aria-label={event.createdBy.displayName} 
                        className={classes.avatar}/>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={event.title}
                    subheader={event.location + ' @ ' + formatDate(event.date)}
                />
                <CardMedia
                    className={classes.media}
                    image={event.photo}
                    title={event.title}
                />
                <CardContent>
                    <Typography component="p">
                       {event.description}
          </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing={true}>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(classes.expand)}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

}

const styles = (theme: Theme) => ({
    card: {
        maxWidth: 400,
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
});

export default withStyles(styles as any, { withTheme: true })(Details as any) as any;