import * as React from 'react';
import { Toolbar, Typography, Tooltip, IconButton, Theme, withStyles } from '@material-ui/core';
const classNames = require('classnames');
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

interface IEnhancedTableToolbarProps {
    classes?: any;
    selected?: number;
}

class EnhancedTableToolbar extends React.Component<IEnhancedTableToolbarProps, {}> {

    public render(): JSX.Element {
        const { selected, classes } = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: selected > 0,
                })}
            >
                <div className={classes.title}>
                    {selected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {selected} selected
            </Typography>
                    ) : (
                            <Typography variant="title" id="tableTitle">
                                Nutrition
            </Typography>
                        )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {selected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Filter list">
                                <IconButton aria-label="Filter list">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>
        );
    }
}

const toolbarStyles = (theme: Theme) => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: `lighten(${theme.palette.secondary.light}, 0.85)`,
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

export default withStyles(toolbarStyles)(EnhancedTableToolbar as any);
