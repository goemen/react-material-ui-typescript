import * as React from 'react';
import { Input } from '@material-ui/core';

interface INumberInputProps {
    onChange?: (...args: any) => void;
    defaultValue?: number;
    id: string;

}

export class NumberInput extends React.Component<INumberInputProps> {

    private onChange = (event: any) => {
        this.props.onChange({target: {value: Number(event.target.value)}});
    }

    public render(): JSX.Element {
        return (<Input
            defaultValue={this.props.defaultValue}
            id="fee"
            onChange={this.onChange}
        />);
    }
}