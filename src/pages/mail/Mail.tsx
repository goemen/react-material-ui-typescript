import * as React from 'react';
import { User } from '../../state/User';
import { Route, Switch } from 'react-router';
import { InboxPage } from './Inbox';
import { SentPage } from './Sent';
import { DraftsPage } from './Drafts';

interface IAccountProps {
    login?: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

export class MailPage extends React.Component<IAccountProps, {}> {

    public render(): JSX.Element {
        return (
        <Switch>
            <Route path="/mail" exact={true} component={InboxPage} />
            <Route path="/mail/inbox" component={InboxPage} />
            <Route path="/mail/sent" component={SentPage} />
            <Route path="/mail/drafts" component={DraftsPage} />
        </Switch>);
    }

}