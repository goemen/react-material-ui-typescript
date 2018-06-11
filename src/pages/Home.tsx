import * as React from 'react';
import { Theme, withStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';

interface IDashboardProps {
    fetchUsers: (context?: any) => void;
    users: any;
    classes?: any;
    theme?: any;
    children?: any;
}

interface IPageState {
    usersTablePage?: number;
    usersTableRowsPerPage: number;
}

class HomePage extends React.Component<IDashboardProps, IPageState> {

    public state: IPageState = {
        usersTablePage: 0,
        usersTableRowsPerPage: 5
    };

    private handleChangeUsersPage = (event: any, page: number) => {
        console.log(event);
        this.setState({ usersTablePage: page });
    };

    private handleChangeTableRowsPerPage = (event: any) => {
        this.setState({ usersTableRowsPerPage: event.target.value });
    };

    private renderUsers(): JSX.Element {
        const { users, classes } = this.props;
        if (!users) {
            return null;
        }

        return (
            <Paper className={classes.users}>
                <h3 className={classes.sectionTitle}>Users</h3>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.items.slice(this.state.usersTablePage * this.state.usersTableRowsPerPage, 
                        this.state.usersTablePage * this.state.usersTableRowsPerPage + this.state.usersTableRowsPerPage).map((n: any) => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell component="th" scope="row">
                                        {n.id}
                                    </TableCell>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell>{n.email}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={users.items.length}
                    rowsPerPage={this.state.usersTableRowsPerPage}
                    page={this.state.usersTablePage}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangeUsersPage}
                    onChangeRowsPerPage={this.handleChangeTableRowsPerPage}
                />
            </Paper>
        );

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
        overflow: 'hidden',
    },
    users: {
        flex: 0.5,
        margin: theme.spacing.unit,
    },
    sectionTitle: {
        paddingLeft: theme.spacing.unit + 3,
    },
});

export default withStyles(styles as any)(HomePage as any) as any;