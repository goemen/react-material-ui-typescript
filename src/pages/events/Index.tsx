import * as React from 'react';
import { DataState } from 'src/state/DataState';
import { Event } from '../../state/Event';
import EditPage from './Edit';
import ListPage from './List';
import { Switch, Route } from 'react-router';

interface IProps {
    events: DataState<Event>;
}

export class EventsPageRouter extends React.Component<IProps, {}> {

    private renderEditor = () => {
        return (<EditPage
            event={this.props.events.selection}
        />)
    }

    public render(): JSX.Element {
        return (
            <Switch>
                <Route path="/events" exact={true} component={ListPage}/>
                <Route path="/events/edit/:id" component={this.renderEditor}/>
            </Switch>
        );
    }

}