//#region
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { ListItemText, Menu, MenuItem, Badge, Avatar } from '@material-ui/core';
import { Route, withRouter, Switch } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { AppState, isAuthenticated } from '../state/AppState';
import { Dispatch, connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Alert } from '../state/Alert';
import { AlertDialog } from '../alert/Alert';
import SpinnerDialog from '../spinner/Spinner';
import { AccountPage } from '../pages/account/Account';
import { MailPage } from '../pages/mail/Mail';
import AdminPage from '../pages/admin/Index';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { actions as MailActionCreators } from '../data/mail';
import { actions as MaterialActionCreators } from '../data/material';
import { getMaterialChartItems, getMailitems, getUsers } from '../selectors';
import AppDrawer, { IRoute } from './App.Drawer';
import NotificationIcon from '@material-ui/icons/Notifications';
import { ADMIN_ROLE } from '../state/User';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import HomePage from '../pages/home/Index';
//#endregion

interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

class MiniDrawer extends React.Component<IAppProps, {}> {

  public componentDidMount() {
    if (!this.props.users.loading && !this.props.users.doneLoading) {
      this.props.fetchUsers();
    }

    if (!this.props.materials.isFetching && !this.props.materials.items.length) {
      this.props.fetchMaterials();
    }

    if (!this.props.mail.length) {
      this.props.fetchMails();
    }
  }

  private handleNotificationMenu = (event: any) => {
    this.props.toggleNotification(event.currentTarget);
  }

  private handleNotificationMenuClose = () => {
    this.props.toggleNotification(null);
  }

  private handleMenu = (event: any) => {
    this.props.toggleAnchor(event.currentTarget);
  }

  private handleMenuClose = (path?: string) => {
    this.props.toggleAnchor(null);
    this.navigate(path);
  }

  public handleLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  }

  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  }

  public handleDrawerOpen = () => {
    this.props.openDrawer();
  }

  public handleDrawerClose = () => {
    this.props.closeDrawer();
  }

  public showPopup = () => {
    this.props.showPopup(new Alert({
      title: 'Testing title',
      message: 'This is a very long message, expect alert to be very wide'
    }));
  }

  public showSpinner = () => {
    this.props.showSpinner('I am loading here please...');
  }

  private renderAlert(): JSX.Element {
    if (this.props.utility.alert) {
      return (
        <AlertDialog
          handleClose={this.props.closePopup}
          data={this.props.utility.alert}
        />
      );
    }

    return null;
  }

  private renderSpinner(): JSX.Element {
    if (this.props.utility.spinner) {
      return (
        <SpinnerDialog
          message={this.props.utility.spinner.message}
        />
      );
    }

    return null;
  }

  private renderNotifications(notifications: any[]) {
    const { classes } = this.props;
    return (
      <Menu
        id='notifications'
        anchorEl={this.props.utility.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notifications}
        open={Boolean(this.props.utility.notificationEl)}
        onClose={this.handleNotificationMenuClose}
      >
        {notifications.map((n: any) => (
          <MenuItem key={n.id} onClick={this.handleNotificationMenuClose} dense={true} button={true} className={classes.notificationListItem}>
            <Avatar src={n.avatar} />
            <ListItemText primary={n.subject} />
          </MenuItem>
        ))}
      </Menu>
    );
  }

  private renderAppBar() {
    if (this.props.authentication) {
      const { classes, utility } = this.props;
      const open = Boolean(utility.anchorEl);
      const notificationsOpen = Boolean(utility.notificationEl);
      const unreadMessages = this.props.mail.filter(x => x.seen === false);

      return (
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!utility.drawerOpen}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.fillSpace} variant='title' color='inherit' noWrap={true}>
              Tomahawk
            </Typography>
            <div>
              <IconButton
                aria-owns={notificationsOpen ? 'notifications' : null}
                aria-haspopup='true'
                color='inherit'
                onClick={this.handleNotificationMenu}
              >
                <Badge badgeContent={unreadMessages.length} color='secondary'>
                  <NotificationIcon />
                </Badge>
              </IconButton>
              {this.renderNotifications(unreadMessages)}
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={utility.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleMenuClose.bind(this, null)}
              >
                <MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>{this.props.authentication.displayName}</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      );
    }

    return null;
  }

  private renderAccount = () => {
    return (
      <AccountPage
        register={this.props.register}
        requestPasswordReset={this.props.requestPasswordReset}
        user={this.props.authentication}
        login={this.props.login}
        match={this.props.match}
        location={this.props.location}
        history={this.props.history}
      />
    );
  }

  private renderDrawer() {
    const { utility, authentication } = this.props;
    let routes: IRoute[] = [];
    if (authentication && authentication.isInRole(ADMIN_ROLE)) {
      routes.push({ path: '/admin', title: 'Dashboard', icon: () => <DashboardIcon /> });
      routes.push({ path: '/admin/user-management', title: 'User Management', icon: () => <GroupIcon /> });
    }

    routes = _.concat(routes, [
      { path: '/', title: 'Inbox', icon: () => <HomeIcon /> },
      { path: '/mail/inbox', title: 'Inbox', icon: () => <InboxIcon /> },
      { path: '/mail/sent', title: 'Sent', icon: () => <SendIcon /> },
      { path: '/mail/drafts', title: 'Drafts', icon: () => <DraftsIcon /> },
      { path: '/account', title: 'Profile', icon: () => <AccountCircleIcon /> }
    ]);

    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          authentication={authentication}
          handleDrawerClose={this.handleDrawerClose}
          routes={routes}
        />
      </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;
    const Dashboard = isAuthenticated((): any => {
      return (
        <AdminPage 
          fetchUsers={this.props.fetchUsers}
          users={this.props.users}
          location={this.props.location}
          materialCharts={this.props.materialCharts}
          selectUser={this.props.selectUser}
          deselectUser={this.props.deselectUser}
          setUserTablePage={this.props.setUserTablePage}
          setUserCustomClaims={this.props.setUserCustomClaims}
          editUser={this.props.editUserSelection}
        />
      );
    });

    const MailBoard = (): any => {
      return (
        <MailPage
          mail={this.props.mail}
        />
      );
    };

    return (
      <div className={classes.root}>
        {this.renderDrawer()}
        {this.renderAppBar()}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/' exact={true} component={HomePage} />
            <Route path='/admin' component={Dashboard} />
            <Route path='/mail' component={MailBoard} />
            <Route path='/account' render={this.renderAccount} />
          </Switch>
          {this.renderAlert()}
          {this.renderSpinner()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  utility: state.utility,
  authentication: state.authentication,
  users: getUsers(state),
  materials: state.materials,
  materialCharts: getMaterialChartItems(state),
  mail: getMailitems(state)
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators, MailActionCreators, MaterialActionCreators), dispatch);
export default withStyles(styles as any, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchtoProps)(MiniDrawer as any) as any) as any) as any;

