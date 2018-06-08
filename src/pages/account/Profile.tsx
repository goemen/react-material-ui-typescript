import * as React from 'react';
import { Typography } from '@material-ui/core';

export class ProfilePage extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (<Typography noWrap={false}>{"Profile Page"}</Typography>)
    }
}