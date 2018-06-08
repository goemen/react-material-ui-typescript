import * as React from 'react'
import { Typography } from '@material-ui/core';
export class InboxPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (<Typography noWrap={false}>{'Inbox page'}</Typography>)
    }
}