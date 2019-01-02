import * as React from 'react';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

interface IDateTimePickerProps {
    value: any;
    onChange: (value: any) => void;
    label: string;
    InputProps?: any;
}

export class DatetimePicker extends React.Component<IDateTimePickerProps, {}> {
    public render(): JSX.Element {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InlineDateTimePicker
                    disablePast={true}
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    InputProps={this.props.InputProps}
                />
            </MuiPickersUtilsProvider>
        );
    }
}
