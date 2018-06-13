import * as React from 'react';
import {
    Theme, withStyles, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Grid
} from '@material-ui/core';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
const classNames = require('classnames');
import GroupIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import BusinessIcon from '@material-ui/icons/BusinessCenter';

interface IDashboardProps {
    fetchUsers: (context?: any) => void;
    users: any;
    materialChartData: any[];
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
            <Paper className={classNames(classes.paper, classes.users)}>
                <h3 className={classes.sectionTitle}>Customers</h3>
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

    private renderRadialBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Inventory</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={this.props.materialChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            label={true}
                            fill="#8884d8" />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    private renderBarChart(): JSX.Element {
        return (
            <Paper className={this.props.classes.paper}>
                <h3 className={this.props.classes.sectionTitle}>Material Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={this.props.materialChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        );
    }

    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container={true} spacing={24}>
                    <Grid item={true} lg={3} xs={12}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <GroupIcon className={classes.headerTileIcon} />
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <MailIcon className={classes.headerTileIcon} />
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <SettingsIcon className={classes.headerTileIcon} />
                        </Paper>
                    </Grid>
                    <Grid item={true} lg={3} xs={12}>
                        <Paper className={classNames(classes.paper, classes.headerTiles)}>
                            <BusinessIcon className={classes.headerTileIcon} />
                        </Paper>
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderBarChart()}
                    </Grid>
                    <Grid item={true} xs={12} md={6}>
                        {this.renderRadialBarChart()}
                    </Grid>
                    <Grid item={true} xs={12}>
                        {this.renderUsers()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 24,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    headerTiles: {
        display: 'flex',
    },
    headerTileIcon: {
        fontSize: 40
    },
    sectionTitle: {
        paddingLeft: theme.spacing.unit * 2,
    },
    users: {
        marginBottom: 24
    },
    chart: {
        width: '100%'
    },
});

export default withStyles(styles as any)(HomePage as any) as any;