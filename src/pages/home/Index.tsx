import * as React from 'react';
import { Theme, withStyles, Typography } from '@material-ui/core';

class HomePage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Typography>Home Page</Typography>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex'
  }
});

export default withStyles(styles as any)(HomePage as any) as any;
