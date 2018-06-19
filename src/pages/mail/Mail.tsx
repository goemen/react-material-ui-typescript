import * as React from 'react';
import { Route, Switch } from 'react-router';
import InboxPage from './Inbox';
import SentPage from './Sent';
import DraftsPage from './Drafts';

interface IMailProps {
    match?: any;
    location?: any;
    classes?: any;
    mail: any[];
}

export class MailPage extends React.Component<IMailProps, {}> {

    private renderInbox = () => {
        return (<InboxPage
            items={this.props.mail}
        />);
    }

    private renderSent = () => {
        return (<SentPage
            items={this.props.mail}
        />);
    }

    private renderDrafts = () => {
        return (<DraftsPage
            items={this.props.mail}
        />);
    }

    public render(): JSX.Element {
        return (
        <Switch>
            <Route path="/mail" exact={true} render={this.renderInbox} />
            <Route path="/mail/inbox" render={this.renderInbox} />
            <Route path="/mail/sent" render={this.renderSent} />
            <Route path="/mail/drafts" render={this.renderDrafts} />
        </Switch>);
    }

}