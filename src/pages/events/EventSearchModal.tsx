import * as React from 'react';
import { withStyles, Theme, Grid, FormControl, InputAdornment, IconButton, Icon, InputLabel } from '@material-ui/core';
import { DatetimePicker } from '../../components/DatetimePicker';
import SearchInput from '../../components/SearchInput';
import { CFAPI } from '../../helpers/cf_api';
import { sortBy } from 'lodash';
import MultiSelectAutoComplete from '../../components/MultiSelectAutoComplete';
import { ISearchQuery, SearchQuery } from '../../state/SearchQuery';
import { NumberInput } from '../../components/NumberInput';
const moment = require('moment');

interface IEventSearchModalProps {
    classes: any;
    query: ISearchQuery;
    onChange: (field: string, value: any) => void;
}

interface IEventSearchModalState {
    cities: any[];
    query: ISearchQuery
}

class EventSearchModal extends React.Component<IEventSearchModalProps, IEventSearchModalState> {

    constructor(props: IEventSearchModalProps) {
        super(props);
        this.state = {
            cities: [],
            query: props.query
        };
    }

    public async componentWillMount() {

        const cities = (await CFAPI.getCities() as any).map((c: string) => {
            return ({ value: c, label: c });
        });

        this.setState({ cities: sortBy(cities, x => x.value) });
    }

    private onFieldChange = (field: string, event: any) => {
        this.props.onChange(field, event.target.value);
    }

    private onMultiFieldChange = (field: string, values: string[]) => {
        this.props.onChange(field, values);
    }

    private onDateChange = (field: string, value: any) => {
        this.props.onChange(field, moment(value).format('YYYY-MM-DDTHH:mm'));
    }

    public render(): JSX.Element {
        return (
            <Grid container={true} direction='row' spacing={24}>
                <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <SearchInput defaultValue={this.props.query.text} onChange={this.onFieldChange.bind(this, SearchQuery.TEXT)} />
                </Grid>
                <Grid item={true} xs={12} sm={12} md={3} lg={3}>
                    <FormControl required={true} className={this.props.classes.field}>
                        <InputLabel htmlFor="minfee">Minimum entry fee</InputLabel>

                        <NumberInput
                            defaultValue={this.props.query.minFee}
                            id='minfee'
                            onChange={this.onDateChange.bind(this, SearchQuery.MIN_FEE)}
                            startAdornment={<InputAdornment position="start">P</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={3} lg={3}>
                    <FormControl required={true} className={this.props.classes.field}>
                        <InputLabel htmlFor="maxfee">Maximum entry fee</InputLabel>

                        <NumberInput
                            defaultValue={this.props.query.maxFee}
                            id='maxfee'
                            onChange={this.onDateChange.bind(this, SearchQuery.MAX_FEE)}
                            startAdornment={<InputAdornment position="start">P</InputAdornment>}
                        />
                    </FormControl>
                </Grid>
                
                <Grid item={true} xs={12} sm={12} md={3} lg={3}>
                    <FormControl required={true} className={this.props.classes.field}>
                        <DatetimePicker
                            value={new Date()}
                            onChange={this.onDateChange.bind(this, SearchQuery.FROM_DATE)}
                            label='From date'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <Icon>event</Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={3} lg={3}>
                    <FormControl required={true} className={this.props.classes.field}>
                        <DatetimePicker
                            value={new Date()}
                            onChange={this.onDateChange.bind(this, SearchQuery.TO_DATE)}
                            label='To date'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <Icon>event</Icon>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item={true} xs={12} sm={12} md={6} lg={6}>
                    <FormControl required={true} fullWidth={true} className={this.props.classes.field}>
                        <MultiSelectAutoComplete
                            defaultValues={this.props.query.location || []}
                            source={this.state.cities}
                            label={'Where'}
                            placeholder={'Select cities...'}
                            onChange={this.onMultiFieldChange.bind(this, SearchQuery.LOCATION)}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

const styles = (theme: Theme) => {
    return ({
        field: {
            width: '100%'
        },
        fillSpace: {
            flex: '1 1 auto'
        }
    });
};
export default withStyles(styles as any, { withTheme: true })(EventSearchModal as any) as any;