import * as React from 'react';
import { Input } from '@material-ui/core';

interface INumberInputProps {
    onChange?: (...args: any) => void;
    defaultValue?: number;
    id?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

export class NumberInput extends React.Component<INumberInputProps> {

    private onChange = (event: any) => {
        this.props.onChange({target: {value: Number(event.target.value)}});
    }

    public render(): JSX.Element {
        return (<Input
            defaultValue={this.props.defaultValue}
            id={this.props.id}
            type='number'
            onChange={this.onChange}
            startAdornment={this.props.startAdornment}
            endAdornment={this.props.endAdornment}
        />);
    }
}