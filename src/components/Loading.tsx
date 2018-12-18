import { Typography, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { ComponentType } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Zoom from '@material-ui/core/Zoom';

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
              <Typography className={classes.title}>Tomahawk</Typography>
            </Zoom>
          </div>) : null
        }
          <div className={classes.loader}>
            <CircularProgress className={classes.loading} />
            <Typography>Loading...</Typography>
          </div>
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
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  titleContent: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30
  },
});

export default withStyles(styles as any)(LoadingPage as ComponentType<WithStyles<any>>) as ComponentType<{}>;
