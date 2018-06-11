import * as React from 'react';
import { TableHead, TableRow, TableCell, Checkbox, Tooltip, TableSortLabel } from '@material-ui/core';

export interface IColumnData {
    id?: string;
    numeric?: boolean;
    disablePadding?: boolean;
    label?: string;
}

interface IEnhancedTableHeadProps {
    onRequestSort?: (event: any, property: any) => any;
    onSelectAllClick?: any;
    order?: any;
    orderBy?: any;
    selected?: number;
    count?: number;
    columns?: IColumnData[];
}

export class EnhancedTableHead extends React.Component<IEnhancedTableHeadProps, {}> {
    private createSortHandler = (property: any) => (event: any) => {
        this.props.onRequestSort(event, property);
    };

    public render() {
        const { columns, onSelectAllClick, order, orderBy, selected, count } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={selected > 0 && selected < count}
                            checked={selected === count}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columns.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}