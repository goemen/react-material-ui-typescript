//#region
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Menu, MenuItem, Badge, LinearProgress, Button } from '@material-ui/core';
import { Route, withRouter, Switch } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { AppState } from '../state/AppState';
import { Dispatch, connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Alert } from '../state/Alert';
import { AlertDialog } from '../alert/Alert';
import SpinnerDialog from '../spinner/Spinner';
import { AccountPage } from '../pages/account/Account';
import AdminPage from '../pages/admin/Index';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { actions as MaterialActionCreators } from '../data/material';
import { getMaterialChartItems, getUsers, getEvents } from '../selectors';
import AppDrawer, { IRoute } from './App.Drawer';
import NotificationIcon from '@material-ui/icons/Notifications';
import { ADMIN_ROLE } from '../state/User';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import ExploreIcon from '@material-ui/icons/Explore';
import { EventsPageRouter } from '../pages/events/Index';
import * as EventsActions from "../actions/Event.Actions";
import { AppMetaTags } from '../components/MetaTags';
import NotFoundPage from '../pages/NotFound';
//#endregion

interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

class Application extends React.Component<IAppProps, {}> {

  public componentDidMount() {
    if (!this.props.users.loading && !this.props.users.doneLoading) {
      this.props.fetchUsers();
    }

    if (!this.props.materials.isFetching && !this.props.materials.items.length) {
      this.props.fetchMaterials();
    }
    if (this.props.utility.appLoading) {
      this.props.toggleProgress();
    }
  }

  private handleNotificationMenu = (event: any) => {
    this.props.toggleNotification(event.currentTarget);
  }

  private handleMenu = (event: any) => {
    this.props.toggleAnchor(event.currentTarget);
  }

  private handleMenuClose = (path?: string) => {
    this.props.toggleAnchor(null);
    this.navigate(path);
  }

  public handleAuth = () => {
    if (!this.props.authentication) {
      this.props.history.push('/account/login');
    } else {
      this.props.logout();
    }
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

  private postNewEvent = () => {
    this.props.history.push('/events/create');
  }

  private renderAppBar() {
    const { authentication, classes, utility } = this.props;
    const open = Boolean(utility.anchorEl);
    const notificationsOpen = Boolean(utility.notificationEl);

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
          <Typography className={classNames(classes.fillSpace)} variant='title' color='inherit' noWrap={true}>
            <p className={classNames(utility.drawerOpen && classes.hideTitle)}>
              {utility.title || process.env.REACT_APP_APPNAME}
            </p>
          </Typography>
          <div className={classes.barActions}>
            {authentication && authentication.isInRole(ADMIN_ROLE) ? (<Button className={classes.shownew} color='inherit' onClick={this.postNewEvent}>
              Post Event
              </Button>) : null
            }
            {
              authentication ? (
                <IconButton
                  aria-owns={notificationsOpen ? 'notifications' : null}
                  aria-haspopup='true'
                  color='inherit'
                  onClick={this.handleNotificationMenu}
                >
                  <Badge badgeContent={10} color='secondary'>
                    <NotificationIcon />
                  </Badge>
                </IconButton>
              ) : null
            }

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
              {this.props.authentication ? (<MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>
                {this.props.authentication.displayName}</MenuItem>) : null}
              <MenuItem onClick={this.handleAuth}> {this.props.authentication ? 'Logout' : 'Login'}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {this.props.utility.appLoading ? (<LinearProgress />) : null}
      </AppBar>
    );

  }

  private renderAccount = (props: any) => {
    return (
      <AccountPage
        {...props}
        register={this.props.register}
        requestPasswordReset={this.props.requestPasswordReset}
        user={this.props.authentication}
        login={this.props.login}
        setTitle={this.props.setTitle}
      />
    );
  }

  private renderDrawer() {
    const { utility, authentication } = this.props;
    let routes: IRoute[] = [];
    if (authentication && authentication.isInRole(ADMIN_ROLE)) {
      routes.push({ path: '/admin', title: 'Dashboard', icon: () => <DashboardIcon /> });
      routes.push({ path: '/admin/user-management', title: 'User Management', icon: () => <GroupIcon /> });
      routes.push({ path: '/events/create', title: 'Post new event', icon: () => <AddIcon /> });
    }

    if (authentication) {
      routes.push({ path: '/account', title: 'Profile', icon: () => <AccountCircleIcon /> });
    }

    routes = _.concat(routes, [
      { path: '/events', title: 'Explore', icon: () => <ExploreIcon /> },
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
    const Dashboard = (props: any): any => {
      return (
        <AdminPage
          fetchUsers={this.props.fetchUsers}
          users={this.props.users}
          materialCharts={this.props.materialCharts}
          selectUser={this.props.selectUser}
          deselectUser={this.props.deselectUser}
          setUserTablePage={this.props.setUserTablePage}
          setUserCustomClaims={this.props.setUserCustomClaims}
          editUser={this.props.editUserSelection}
          setTitle={this.props.setTitle}
          {...props}
        />
      );
    };

    const EventsPage = (props: any): any => {
      return (
        <EventsPageRouter
          {...props}
          load={this.props.loadEvents}
          events={this.props.events}
          createInit={this.props.startCreateEvent}
          editEvent={this.props.editEvent}
          saveEvent={this.props.saveEvent}
          changeSelection={this.props.changeSelection}
          toggleProgress={this.props.toggleProgress}
          setTitle={this.props.setTitle}
        />
      );
    };

    const NotFound = () => {
      return (
        <NotFoundPage setTitle={this.props.setTitle} />
      );
    };

    return (
      <div className={classes.root}>
        {this.renderDrawer()}
        {this.renderAppBar()}

        <main className={classNames(classes.content, this.props.utility.drawerOpen && classes.fillContent)}>
          <AppMetaTags title={this.props.utility.title} />
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/' exact={true} render={EventsPage} />
            <Route path='/admin' render={Dashboard} />
            <Route path='/account' render={this.renderAccount} />
            <Route path='/events' render={EventsPage} />
            <Route render={NotFound}/>
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
  events: getEvents(state),
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators, MaterialActionCreators, EventsActions), dispatch);



export default withStyles(styles as any, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchtoProps)(Application as any) as any) as any) as any;

