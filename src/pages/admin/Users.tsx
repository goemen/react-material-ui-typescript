import * as React from 'react';
import { Theme, withStyles, Typography, Paper } from '@material-ui/core';
import { DataState } from '../../state/DataState';
import { User } from '../../state/User';
import { Grid, Table, TableHeaderRow, TableSelection, PagingPanel, TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { SelectionState, PagingState, IntegratedPaging, RowDetailState } from '@devexpress/dx-react-grid';
import { RowDetailComponent } from './UserDetailsRow';

interface IUserManagementPageProps {
    fetchUsers: () => void;
    users?: DataState<User>;
    location?: any;
    classes?: any;
}

interface IState {
    selection?: number[];
    expandedRows?: number[];
}

class UserManagementPage extends React.Component<IUserManagementPageProps, IState> {

    public state: IState = { selection: [] as number[], expandedRows: [] };

    public componentDidMount() {
        if (!this.props.users.loading && !this.props.users.doneLoading) {
            this.props.fetchUsers();
        }
    }

    private changeSelection = (selection: number[]) => {
        this.setState({expandedRows: [selection[selection.length - 1]]});
        this.setState({ selection: [selection[selection.length -1]] });
    }

    public render(): JSX.Element {
        const rows = this.props.users.items.toArray();

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
                            selection={this.state.selection}
                            onSelectionChange={this.changeSelection}
                        />
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={1}
                        />
                        <RowDetailState
                            expandedRowIds={this.state.expandedRows}
                        />
                        <IntegratedPaging />

                        <Table />
                        <TableHeaderRow />
                        <TableRowDetail
                            contentComponent={RowDetailComponent}
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
