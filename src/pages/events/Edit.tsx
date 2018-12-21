import * as React from 'react';
import {
    Theme, withStyles, FormControl, InputLabel, Input, Button, TextField, Card, CardHeader,
    Avatar, CardMedia, CardContent, CardActions
} from '@material-ui/core';
import { Event } from '../../state/Event';
const moment = require('moment');
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IEventSelect, uploadPhoto, formatDate } from '../../helpers/misc';
import UploadIcon from '@material-ui/icons/FileUpload';
import * as _ from 'lodash';

interface IEditProps {
    match?: any;
    location?: any;
    history?: any;
    save?: (event: Event) => void;
    edit?: (property: string, value: any) => void;
    createInit: () => void;
    changeSelection: (selection: IEventSelect) => void;
    toggleProgress: () => void;
    classes: any;
    event: Event;
    formTitle: string;
}

class Edit extends React.Component<IEditProps, {}> {    
    private uploadInput = React.createRef();
    constructor(props: IEditProps) {
        super(props);
    }
    public componentWillMount() {
        const { id } = this.props.match.params;
        if (!id) {
            this.props.createInit();
        } else {
            this.props.changeSelection({eventId: id});
        }
    }

    private edit = (prop: string, event: any) => {
        this.props.edit(prop, event.target.value);
    }

    private save = async () => {
        this.props.toggleProgress();
        const user = firebase.auth().currentUser;
        try {
            const {event} = this.props;
            let id = event.id;
            let photoUrl = _.clone(event.photo);
            if (photoUrl.indexOf('data:image/') !== -1) {
                photoUrl = await uploadPhoto('events', photoUrl);
            }

            const data = {...event.toSaveable(), [Event.PHOTO]: photoUrl};
            const events = firebase.firestore().collection('events');

            if (!event.id) {
                data.createdBy = user.uid;
                data.createDate = new Date();
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
            // TODO: handle error
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
                    ref={(element : any) => this.uploadInput = element }
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
                            <Avatar aria-label="Cover" className={classes.avatar}
                                src={this.props.event.photo}
                            />
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
                        title="Paella dish"
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
                                onChange={this.edit.bind(this, 'fee')}
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} className={classes.field}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                defaultValue={this.props.event.description}
                                id="description"
                                onChange={this.edit.bind(this, 'description')}

                            />
                        </FormControl>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing={true}>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!this.props.event.valid}
                            variant="raised"
                            color="primary"
                            onClick={() => this.save()}
                            className={classes.button}>
                            Submit
                        </Button>
                    </CardActions>

                </Card>
                {/* <Paper className={classes.paper}>
                    <h2>{this.props.formTitle}</h2>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="outlined-button-file"
                        multiple={false}
                        onChange={this.onCoverPhotoChange}
                        hidden={true}
                        type="file"
                    />
                    <label htmlFor="outlined-button-file">
                        <Button variant="outlined" component="span" className={classes.button}>
                            Upload Cover Photo
                        </Button>
                    </label>
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
                            onChange={this.edit.bind(this, 'fee')}
                        />
                    </FormControl>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input
                            defaultValue={this.props.event.description}
                            id="description"
                            onChange={this.edit.bind(this, 'description')}

                        />
                    </FormControl>

                    <div className={classes.actions}>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!this.props.event.valid}
                            variant="raised"
                            color="primary"
                            onClick={() => this.save()}
                            className={classes.button}>
                            Submit
                        </Button>
                    </div>
                </Paper> */}
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