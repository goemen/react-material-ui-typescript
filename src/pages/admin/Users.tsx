import * as React from 'react';
import { Theme, withStyles, Typography, Paper } from '@material-ui/core';
import { DataState } from '../../state/DataState';
import { User } from '../../state/User';
import { Grid, Table, TableHeaderRow, TableSelection, PagingPanel, TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { SelectionState, PagingState, IntegratedPaging, RowDetailState } from '@devexpress/dx-react-grid';
import { RowDetailComponent } from './UserDetailsRow';
import * as _ from 'lodash';
import { Page } from '../Page';

interface IUserManagementPageProps {
    fetchUsers: () => void;
    users?: DataState<User, any>;
    selectUser: (user: User, index: number) => void;
    deselectUser: () => void;
    setUserTablePage: (page: number) => void;
    setUserCustomClaims: (userId: string, claims: any) => void;
    editUser: (path: any, value: any) => void;
    location?: any;
    classes?: any;
    setTitle: (title: string) => void;
    history: any;
}

const TableRow = ({row, ...restProps}: any) => {
    return (<Table.Row
        {...restProps}
        onClick={() => {console.log(row)}}
    />);
}

class UserManagementPage extends Page<IUserManagementPageProps, {}> {

    public componentWillMount() {
        this.setTitle('Manage users');
    }
    public componentDidMount() {
        if (!this.props.users.loading && !this.props.users.doneLoading) {
            this.props.fetchUsers();
        }
    }

    private changeSelection = (selection: (string | number)[]) => {
        if (selection.length) {
            const rows = this.props.users.items.toArray();
            const index = selection[selection.length - 1];
            const user = this.props.users.items.get(rows[index].uid);
    
            this.props.selectUser(_.clone(user), index as number);
        }
    }

    private changePage = (page: number) => {
        this.props.setUserTablePage(page);
    }

    private UserDetailsComponent = (props: any) => {
        return (
            <RowDetailComponent
                row={props.row}
                editUser={this.props.editUser}
                selectedUser={this.props.users.selection}
                setUserCustomClaims={this.props.setUserCustomClaims}
            />
        );
    }

    public render(): JSX.Element {
        const rows = this.props.users.items.toArray();
        const selection = this.props.users.selectionIndex > -1 ? [this.props.users.selectionIndex] : [];

        return (
            <div className={this.props.classes.main}>
                <Typography className={this.props.classes.title}>Manage users</Typography>
                <Paper>
                    <Grid
                        rows={rows}
                        columns={[
                            { name: 'email', title: 'Email Address' },
                            { name: 'displayName', title: 'Name' },
                        ]}>
                        <SelectionState
                            selection={selection}
                            onSelectionChange={this.changeSelection}
                        />
                        <PagingState
                            currentPage={this.props.users.pageIndex}
                            onCurrentPageChange={this.changePage}
                            pageSize={1}
                        />
                        <RowDetailState
                            expandedRowIds={selection}
                        />
                        <IntegratedPaging />

                        <Table rowComponent={TableRow}/>
                        <TableHeaderRow />
                        <TableRowDetail
                            contentComponent={this.UserDetailsComponent}
                        />
                        <TableSelection
                            selectByRowClick={true}
                        />
                        <PagingPanel />

                    </Grid>
                </Paper>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: 25,
        marginBottom: 10
    },
});

export default withStyles(styles as any)(UserManagementPage as any) as any;
