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
import { Route, withRouter } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { AppState, isAuthenticated } from '../state/AppState';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators, Dispatch} from 'redux';
import { Alert } from '../state/Alert';
import { AlertDialog } from '../alert/Alert';
import SpinnerDialog from '../spinner/Spinner';
import { AccountPage } from '../pages/account/Account';
import { MailPage } from '../pages/mail/Mail';
import HomePage from '../pages/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { actions as UserActionCreators } from '../data/users';
import { actions as MailActionCreators } from '../data/mail';
import { actions as MaterialActionCreators } from '../data/material';
import { getMaterialChartItems, getMailitems } from '../selectors';
import AppDrawer from './App.Drawer';
import NotificationIcon from '@material-ui/icons/Notifications';
//#endregion

interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

interface IState {
  anchorEl: any;
  notificationEl: any;
}

class MiniDrawer extends React.Component<IAppProps, IState> {

  public state: IState = {
    anchorEl: null,
    notificationEl: null
  };

  public componentWillMount() {
    this.props.fetchUsers();
    this.props.fetchMaterials();
    this.props.fetchMails();
  }

  private handleNotificationMenu = (event: any) => {
    this.setState({ notificationEl: event.currentTarget });
  };

  private handleNotificationMenuClose = () => {
    this.setState({ notificationEl: null });
  };

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = (path?: string) => {
    this.setState({ anchorEl: null });
    this.navigate(path);
  };

  public handleLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  }

  public handleDrawerOpen = () => {
    this.props.openDrawer();
  };

  public handleDrawerClose = () => {
    this.props.closeDrawer();
  };

  public showPopup = () => {
    this.props.showPopup(new Alert({
      title: "Testing title",
      message: "This is a very long message, expect alert to be very wide"
    }))
  }

  public showSpinner = () => {
    this.props.showSpinner("I am loading here please...")
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

    return null
  }

  private renderSpinner(): JSX.Element {
    if (this.props.utility.spinner) {
      return (
        <SpinnerDialog
          message={this.props.utility.spinner.message}
        />
      );
    }

    return null
  }

  private renderNotifications(notifications: any[]) {
    const { classes } = this.props;
    return (
      <Menu
        id="notifications"
        anchorEl={this.state.notificationEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notifications}
        open={Boolean(this.state.notificationEl)}
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
      const { anchorEl, notificationEl } = this.state;
      const open = Boolean(anchorEl);
      const notificationsOpen = Boolean(notificationEl);
      const unreadMessages = this.props.mail.filter(x => x.seen === false);

      return (
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!utility.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
              Tomahawk
            </Typography>
            <div>
              <IconButton
                aria-owns={notificationsOpen ? 'notifications' : null}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleNotificationMenu}
              >
                <Badge badgeContent={unreadMessages.length} color="secondary">
                  <NotificationIcon />
                </Badge>
              </IconButton>
              {this.renderNotifications(unreadMessages)}
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
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
                <MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>{this.props.authentication.name}</MenuItem>
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
      <AccountPage user={this.props.authentication} login={this.props.login} match={this.props.match} location={this.props.location} />
    );
  }

  private renderDrawer() {
    const { utility, authentication } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          authentication={authentication}
          handleDrawerClose={this.handleDrawerClose}
        />
      </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;
    const Dashboard = isAuthenticated((props: any): any => {
      return (
        <HomePage
          users={this.props.users}
          fetchUsers={this.props.fetchUsers}
          materialChartData={this.props.materialCharts}
        />
      );
    });

    const MailBoard = isAuthenticated((props: any): any => {
      return (
        <MailPage
          mail={this.props.mail}
        />
      );
    });


    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {this.renderDrawer()}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/' exact={true} component={Dashboard} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/mail' component={MailBoard} />
          <Route path='/account' render={this.renderAccount} />
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
  users: state.users,
  materials: state.materials,
  materialCharts: getMaterialChartItems(state),
  mail: getMailitems(state)
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(_.assign({}, AppActionCreators, MailActionCreators,
    UserActionCreators, MaterialActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
