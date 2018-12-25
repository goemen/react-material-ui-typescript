import { Theme, withStyles, WithStyles, Avatar } from '@material-ui/core';
import * as React from 'react';
import { ComponentType } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';
import { blue } from "@material-ui/core/colors";

class LoadingPage extends React.Component<{ classes?: any, hideTitle?: boolean }, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
        {
          !this.props.hideTitle ? 
          (<div className={classes.titleContent}>
            <Zoom in={true}>
              <div className={classes.wrapper}>
                <CircularProgress size={50} className={classes.fabProgress} />
                <Avatar className={classes.logo} 
                src={process.env.REACT_APP_APP_ICON}/>
              </div>
            </Zoom>
          </div>) : null
        }
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    marginRight: 10
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logo: {
    position: 'absolute',
    top: '50%',
    width: 50,
    height: 50
  },
  titleContent: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  fabProgress: {
    color: blue,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default withStyles(styles as any)(LoadingPage as ComponentType<WithStyles<any>>) as ComponentType<{}>;
