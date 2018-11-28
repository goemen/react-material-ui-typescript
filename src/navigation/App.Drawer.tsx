import * as React from 'react';

import { Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { User } from '../state/User';
import { Utility } from '../state/Utility';
import { NavLink } from 'react-router-dom';
import { styles } from './styles';
const classNames = require('classnames');

export interface IRoute {
    path: string;
    title: string;
    icon: any;
}

interface IAppDrawer {
    authentication?: User;
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
    routes: IRoute[];
}

class AppDrawer extends React.Component<IAppDrawer, {}> {

    public render(): JSX.Element {
        const { authentication, classes, utility, theme, routes } = this.props;
        return (
            <Drawer
                hidden={!authentication}
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !utility.drawerOpen && classes.drawerPaperClose),
                }}
                open={utility.drawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {routes.map((route, index) => {
                    return (
                        <NavLink key={index} exact={true} activeClassName={classes.current} className={classes.link} to={route.path} >
                            <ListItem button={true}>
                                <ListItemIcon>
                                    {route.icon()}
                                </ListItemIcon>
                                <ListItemText primary={route.title} />
                            </ListItem>
                        </NavLink>
                    );
                })}
                <Divider />
            </Drawer>
        );
    }
}

export default withStyles(styles as any, { withTheme: true })(AppDrawer as any) as any;