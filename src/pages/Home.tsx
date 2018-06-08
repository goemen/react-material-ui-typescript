import * as React from 'react';
import { Typography } from '@material-ui/core';

export class HomePage extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (<Typography noWrap={false}>{"Home Page"}</Typography>)
    }
}