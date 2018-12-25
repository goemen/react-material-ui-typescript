
import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { noop } from 'lodash';
const classNames = require('classnames');

interface IDashboardTileProps {
    onClick?: () => void;
    classes: any;
    icon: any;
    label: string;
}

export class DashboardTile extends React.Component<IDashboardTileProps> {
    public render(): JSX.Element {
        const { classes, onClick } = this.props;
        return (
            <Paper onClick={onClick || noop } className={classNames(classes.paper, classes.headerTiles)}>
                {this.props.icon}
                <Typography className={classes.tileText}>{this.props.label}</Typography>
            </Paper>
        );
    }
}