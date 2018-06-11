import * as React from 'react';
import { Theme, withStyles } from '@material-ui/core';

interface IDashboardProps {
    fetchUsers: (context?: any) => void;
    users: any;
    classes?: any;
    theme?: any;
    children?: any;
}

class HomePage extends React.Component<IDashboardProps, {}> {

    private renderUsers(): JSX.Element {
        return null;
    }
    
    public render(): JSX.Element {
        return (
            <div className={this.props.classes.root}>
                {this.renderUsers()}
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
});

export default withStyles(styles as any)(HomePage as any) as any;