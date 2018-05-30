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
import { Route, Link, withRouter } from 'react-router-dom';
import { InboxPage } from '../pages/Inbox';
import Hidden from '@material-ui/core/Hidden';
import { SentPage } from '../pages/Sent';
import { DraftsPage } from '../pages/Drafts';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { AppState } from '../state/AppState';
import { Dispatch, connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators } from 'redux';

const mailFolderList: any = () => {
  return (
    <List>
      <Link to='/inbox' >
        <ListItem button={true}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </Link>
      <Link to='/sent' >
        <ListItem button={true}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItem>
      </Link>
      <Link to='/drafts' >

        <ListItem button={true}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </Link>
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

  public render() {
    const { utility, classes, theme } = this.props;

    return (
      <div className={classes.root}>
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
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden mdDown={!utility.drawerOpen && true}>
          <Drawer
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
            {mailFolderList()}
            <Divider />
          </Drawer>

        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/inbox' component={InboxPage} />
          <Route path='/sent' component={SentPage} />
          <Route path='/drafts' component={DraftsPage} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  utility: state.utility
});

const mapDispatchtoProps = (dispatch: Dispatch) => bindActionCreators(_.assign({},AppActionCreators), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
