import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
    },
    avatar: {
        marginRight: 5
    },
    summary: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        height: '100%',
        verticalAlign: 'middle',
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.text.secondary,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

interface IMailListProps {
    items: any[];
    classes: any;
}

interface IState {
    expanded?: number;
}

class MailList extends React.Component<IMailListProps, IState> {
    public state: IState = {
        expanded: null,
    };

    private handleChange = (panel: any) => (event: any, expanded: any) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    public render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                {this.props.items.map((item: any) => {
                    return (

                        <ExpansionPanel key={item.id} expanded={expanded === item.id} onChange={this.handleChange(item.id)}>
                            <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                                <Avatar className={classes.avatar} src={item.avatar} />
                                <Typography className={classes.heading}>{item.from}</Typography>
                                <Typography className={classes.secondaryHeading}>{item.subject}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {item.content}
                                </Typography>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                                <Button size="small">Cancel</Button>
                                <Button size="small" color="primary">
                                    Delete
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
}


export default withStyles(styles)(MailList);
