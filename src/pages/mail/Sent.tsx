import * as React from 'react'
import { Typography } from '@material-ui/core';

export class SentPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (<Typography noWrap={false}>{'Sent page'}</Typography>)
    }
}