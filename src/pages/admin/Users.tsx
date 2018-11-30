import * as React from 'react';
import { Theme, withStyles, Typography, Paper, Button, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { DataState } from '../../state/DataState';
import { User } from '../../state/User';
import { Grid, Table, TableHeaderRow, TableSelection, PagingPanel, TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { SelectionState, PagingState, IntegratedPaging, RowDetailState } from '@devexpress/dx-react-grid';

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

const RowDetail = ({ row, classes }: { row: User, classes: any }) => (
    <div className={classes.container}>
        <Typography className={classes.title}>Edit claims</Typography>
        <div className={classes.claims}>
            <FormGroup row={true}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={row.claims.admin}
                            value='admin'
                        />
                    }
                    label='Administrator'
                />
            </FormGroup>
        </div>
        <Button size='small' color='primary'>Save</Button>
    </div>
);

const rowDetailStyle = (theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    claims: {
        display: 'flex',
        flexDirection: 'column',
        margin: 15,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    title: {
        fontSize: 15
    }
});

const RowDetailComponent = withStyles(rowDetailStyle as any)(RowDetail as any) as any;

class UserManagementPage extends React.Component<IUserManagementPageProps, IState> {

    public state: IState = { selection: [] as number[], expandedRows: [] };

    public componentDidMount() {
        if (!this.props.users.loading && !this.props.users.doneLoading) {
            this.props.fetchUsers();
        }
    }

    private changeSelection = (selection: number[]) => {
        this.setState({ selection });
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
                            pageSize={rows.length}
                        />
                        <RowDetailState
                            defaultExpandedRowIds={[2, 5]}
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
