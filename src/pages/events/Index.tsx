import * as React from 'react';
import { DataState } from 'src/state/DataState';
import { Event } from '../../state/Event';
import EditPage from './Edit';
import ListPage from './List';
import { Switch, Route } from 'react-router';

interface IProps {
    events: DataState<Event>;
    createInit: () => void;
    editEvent: (prop: string, value: any) => void;
    match: any,
    saveEvent: (event: Event) => void;
}

export class EventsPageRouter extends React.Component<IProps, {}> {

    private renderEditor = (props: any) => {
        return (<EditPage {...props}
            createInit={this.props.createInit}
            edit={this.props.editEvent}
            formTitle={"Post new event"}
            event={this.props.events.selection}
            save={this.props.saveEvent}
        />)
    }

    public render(): JSX.Element {
        return (
            <Switch>
                <Route path="/events" exact={true} render={ListPage}/>
                <Route path="/events/edit/:id" render={this.renderEditor}/>
            </Switch>
        );
    }

}