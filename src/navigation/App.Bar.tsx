//#region 
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AccountCirleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Route, withRouter, NavLink } from 'react-router-dom';
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
import { HomePage } from '../pages/Home';
//#endregion

const mailFolderList: any = (classes: any) => {
  return (
    <List>
      <NavLink activeClassName={classes.active} className={classes.link} to='/' >
        <ListItem button={true}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.link} to='/mail/inbox' >
        <ListItem button={true}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.link} to='/mail/sent' >
        <ListItem button={true}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItem>
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.link} to='/mail/drafts' >

        <ListItem button={true}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </NavLink>
      <NavLink activeClassName={classes.active} className={classes.link} to='/account' >

        <ListItem button={true}>
          <ListItemIcon>
            <AccountCirleIcon/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </NavLink>
    </List>
  );
};


interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

class MiniDrawer extends React.Component<IAppProps, {}> {

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

  private renderAppBar() {
    if (this.props.authentication) {
      const { classes, utility } = this.props;
      return (
        <AppBar
          position="absolute"
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
            <Typography variant="title" color="inherit" noWrap={true}>
              Eliminator
            </Typography>
          </Toolbar>
        </AppBar>
      );
    }

    return null;
  }

  private renderAccount = () => {
    return (
      <AccountPage user={this.props.authentication} login={this.props.login} match={this.props.match} location={this.props.location}/>
    );
  }

  private renderDrawer() {
    const { utility, classes, authentication, theme } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
      <Drawer
        hidden={!authentication}
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !utility.drawerOpen && classes.drawerPaperClose),
        }}
        open={utility.drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {mailFolderList(classes)}
        <Divider />
      </Drawer>

    </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {this.renderDrawer()}
       
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/' exact={true} component={isAuthenticated(HomePage as any)}/>
          <Route path='/dashboard' component={isAuthenticated(HomePage as any)}/>          
          <Route path='/mail' component={MailPage} />
          <Route path='/account' render={this.renderAccount}/>
          {this.renderAlert()}
          {this.renderSpinner()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  utility: state.utility,
  authentication: state.authentication
});

const mapDispatchtoProps = (dispatch: Dispatch) => bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
