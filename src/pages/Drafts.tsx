import * as React from 'react'
import { Typography } from '@material-ui/core';

export class DraftsPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (<Typography noWrap={false}>{'Drafts page'}</Typography>)
    }
}