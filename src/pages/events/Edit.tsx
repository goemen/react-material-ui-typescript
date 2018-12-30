import * as React from 'react';
import {
    Theme, withStyles, FormControl, InputLabel, Input, Button, TextField, Card, CardHeader,
    Avatar, CardMedia, CardContent, CardActions, Collapse, Typography, Select, MenuItem, Hidden
} from '@material-ui/core';
import { Event } from '../../state/Event';
const moment = require('moment');
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IEventSelect, uploadPhoto, formatDate } from '../../helpers/misc';
import UploadIcon from '@material-ui/icons/FileUpload';
import * as _ from 'lodash';
import { Page } from '../Page';

interface IEditProps {
    match?: any;
    location?: any;
    save?: (event: Event) => void;
    edit?: (property: string, value: any) => void;
    createInit: () => void;
    changeSelection: (selection: IEventSelect) => void;
    toggleProgress: () => void;
    classes: any;
    event: Event;
    formTitle: string;
    setTitle: (title: string) => void;
    history: any;
}

interface IPageSate {
    drawSettingsOpen: boolean;
}

class Edit extends Page<IEditProps, IPageSate> {
    public state: IPageSate = {
        drawSettingsOpen: true
    }

    private uploadInput = React.createRef();
    constructor(props: IEditProps) {
        super(props);
    }

    public async componentWillMount() {
        super.componentWillMount();
        this.props.setTitle(this.props.formTitle);
        const { id } = this.props.match.params;
        if (!id) {
            this.props.createInit();
        } else {
            try {
                const ref = await firebase.firestore().collection('events').doc(id).get();
                if (ref.exists) {
                    const data: any = ref.data();
                    const event = new Event({
                        ...data,
                        id
                    });
                    this.props.changeSelection({ event });
                } else {
                    this.props.history.replace('/not-found');
                }
            } catch (err) {
                this.props.history.replace('/not-found');
            }
        }
    }

    private edit = (prop: string, event: any) => {
        this.props.edit(prop, event.target.value);
    }

    private async save() {
        this.props.toggleProgress();
        const user = firebase.auth().currentUser;
        try {
            const { event } = this.props;
            let id = event.id;
            let photoUrl = _.clone(event.photo);
            if (photoUrl.indexOf('data:image/') !== -1) {
                photoUrl = await uploadPhoto('events', photoUrl);
            }

            const data = { ...event.toSaveable(), [Event.PHOTO]: photoUrl };
            const events = firebase.firestore().collection('events');
            if (!data.nextDraw) {
                data.nextDraw = this.props.event.firstDraw;
            }
            if (!event.id) {
                data.createdBy = user.uid;
                data.createDate = new Date();
                data.nextDraw = this.props.event.firstDraw;
                const result = await events.add(data);
                id = result.id;
                this.props.changeSelection({ eventId: result.id });

            } else {
                await events.doc(event.id).update(data);
                this.props.changeSelection({ eventId: event.id });
            }
            this.props.toggleProgress();
            this.navigate(id);

        } catch (error) {
            console.log(error);
            this.error('Failed to save the event. Please try again');
        }
    }

    private navigate = (id: string) => {
        this.props.history.replace('/events/details/' + id)
    }

    private onCoverPhotoChange = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = (e: any) => {
            this.props.edit(Event.PHOTO, reader.result);
        }
    }

    private triggerSelectImage = () => {
        (this.uploadInput as any).click();
    }

    private renderUploadButton = () => {
        return (
            <div>
                <input
                    accept="image/*"
                    className={this.props.classes.input}
                    id="outlined-button-file"
                    multiple={false}
                    onChange={this.onCoverPhotoChange}
                    hidden={true}
                    ref={(element: any) => this.uploadInput = element}
                    type="file"
                />
                <label htmlFor="outlined-button-file">

                    <Button onClick={this.triggerSelectImage}>
                        Upload cover photo
                        <UploadIcon />
                    </Button>
                </label>
            </div>
        );
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (!this.props.event) {
            return null;
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Hidden smDown={true}>

                                <Avatar aria-label="Cover" className={classes.avatar}
                                    src={this.props.event.photo}
                                />
                            </Hidden>
                        }
                        action={
                            this.renderUploadButton()
                        }
                        title={this.props.event.title}
                        subheader={formatDate(this.props.event.date)}
                    />
                    <CardMedia
                        className={classes.media}
                        image={this.props.event.photo}
                        title={this.props.event.title}
                    />
                    <CardContent>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input
                                defaultValue={this.props.event.title}
                                id="title"
                                onChange={this.edit.bind(this, 'title')}
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <TextField
                                label="When?"
                                type='datetime-local'
                                defaultValue={moment(this.props.event.date).format('YYYY-MM-DDTHH:mm')}
                                onChange={this.edit.bind(this, 'date')}
                                id="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <InputLabel htmlFor="where">Where?</InputLabel>
                            <Input
                                defaultValue={this.props.event.location}
                                id="location"
                                onChange={this.edit.bind(this, 'location')}

                            />
                        </FormControl>
                        <FormControl fullWidth={true} className={classes.field}>
                            <InputLabel htmlFor="fee">Door fee?</InputLabel>
                            <Input
                                defaultValue={this.props.event.price}
                                id="fee"
                                onChange={this.edit.bind(this, Event.PRICE)}
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                multiline={true}
                                rowsMax={6}
                                rows={6}
                                defaultValue={this.props.event.description}
                                id="description"
                                onChange={this.edit.bind(this, 'description')}

                            />
                        </FormControl>
                    </CardContent>

                    <Collapse in={this.state.drawSettingsOpen} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph={true} variant='subtitle1'>Free Ticket Draw Settings:</Typography>
                            <Typography paragraph>
                                You can set the number of draw ticket to zero to disable settings.
                            </Typography>
                            <FormControl fullWidth={true} className={classes.field}>
                                <InputLabel htmlFor="count">Number of tickets per draw</InputLabel>
                                <Input
                                    defaultValue={this.props.event.ticketsCountPerDraw}
                                    id="count"
                                    onChange={this.edit.bind(this, Event.DRAW_TICKET_COUNT)}
                                />
                            </FormControl>
                            <FormControl fullWidth={true} className={classes.field}>
                                <InputLabel htmlFor="rate">Ticket Draw Rate</InputLabel>
                                <Select
                                    value={this.props.event.drawRate}
                                    onChange={this.edit.bind(this, Event.DRAW_RATE)}
                                    inputProps={{
                                        name: 'rate',
                                        id: 'rate',
                                    }}
                                >
                                    <MenuItem value={'day'}>Daily</MenuItem>
                                    <MenuItem value={'week'}>Weekly</MenuItem>
                                    <MenuItem value={'month'}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl required={true} fullWidth={true} className={classes.field}>
                                <TextField
                                    label="First draw date"
                                    type='datetime-local'
                                    defaultValue={moment(this.props.event.firstDraw).format('YYYY-MM-DDTHH:mm')}
                                    onChange={this.edit.bind(this, Event.FIRST_DRAW_DATE)}
                                    id="firstDraw"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl required={true} fullWidth={true} className={classes.field}>
                                <TextField
                                    label="Last draw date"
                                    type='datetime-local'
                                    defaultValue={moment(this.props.event.lastDrawDate).format('YYYY-MM-DDTHH:mm')}
                                    onChange={this.edit.bind(this, Event.LAST_DRAW_DATE)}
                                    id="lasttDraw"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </CardContent>
                    </Collapse>
                    <CardActions className={classes.actions} disableActionSpacing={true}>
                        <Button variant="contained" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!this.props.event.valid}
                            variant="contained"
                            color="primary"
                            onClick={this.save.bind(this)}
                            className={classes.button}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',

    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    }),
    field: {
        marginTop: theme.spacing.unit * 3
    },
    media: {
        height: 0,
        paddingTop: '40%', // 16:9
    },
    actions: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    }),
    button: {
        marginRight: theme.spacing.unit
    },
});

export default withStyles(styles as any, { withTheme: true })(Edit as any) as any;