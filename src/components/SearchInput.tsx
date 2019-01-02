import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
};

class SearchInput extends React.Component<{ defaultValue?: string; classes: any; onChange: (value: string) => void; }> {

    private onChange = (event: any) => {
        this.props.onChange(event);
    }

    public render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                {/* <IconButton className={classes.iconButton} aria-label="Menu">
                    <MenuIcon />
                </IconButton> */}
                <InputBase defaultValue={this.props.defaultValue} className={classes.input} onChange={this.onChange} placeholder='Enter search text here....' />
                <IconButton className={classes.iconButton} aria-label="Search">
                    <CloseIcon />
                </IconButton>
                {/* <Divider className={classes.divider} /> */}
                {/* <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
                    <DirectionsIcon />
                </IconButton> */}
            </Paper>
        );
    }
}

export default withStyles(styles as any)(SearchInput as any) as any;