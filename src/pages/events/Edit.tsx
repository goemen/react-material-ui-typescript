import * as React from 'react';
import { Theme, withStyles, Paper, FormControl, InputLabel, Input, Button, TextField } from '@material-ui/core';
import { Event } from '../../state/Event';
import * as moment from 'moment';

interface IEditProps {
    match?: any;
    location?: any;
    save?: (event: Event) => void;
    edit?: (property: string, value: any) => void;
    createInit: () => void;
    classes: any;
    event: Event;
    formTitle: string;
    firestore: any;
}

class Edit extends React.Component<IEditProps, {}> {

    public componentWillMount() {
        this.props.createInit();
    }

    private edit = (prop: string, event: any) => {
        this.props.edit(prop, event.target.value);
    }

    private save = () => {
        debugger
        this.props.save(this.props.event);
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (!this.props.event) {
            return null;
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{this.props.formTitle}</h2>
                    <form>
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
                    </form>
                </Paper>
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

export default withStyles(styles as any, {withTheme: true})(Edit as any) as any;