import * as React from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { User } from '../state/User';
import { Utility } from '../state/Utility';
import { NavLink } from 'react-router-dom';
import { styles } from './styles';
const classNames = require('classnames');

interface IAppDrawer {
    authentication?: User;
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
}

class AppDrawer extends React.Component<IAppDrawer, {}> {
    public routes = [
        { path: '/', title: 'Dashboard', icon: () => <DashboardIcon /> },
        { path: '/mail/inbox', title: 'Inbox', icon: () => <InboxIcon /> },
        { path: '/mail/sent', title: 'Sent', icon: () => <SendIcon /> },
        { path: '/mail/drafts', title: 'Drafts', icon: () => <DraftsIcon /> },
        { path: '/account', title: 'Profile', icon: () => <AccountCircleIcon /> }
    ]

    public render(): JSX.Element {
        const { authentication, classes, utility, theme } = this.props;
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
                {this.routes.map((route, index) => {
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