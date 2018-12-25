import * as React from 'react';
import { DataState } from '../../state/DataState';
import { Event } from '../../state/Event';
import EditPage from './Edit';
import ListPage from './List';
import { Switch, Route } from 'react-router';
import { IEventSelect } from '../../helpers/misc';
import Details from './Details';

interface IProps {
    load: () => void;
    events: DataState<Event>;
    createInit: () => void;
    editEvent: (prop: string, value: any) => void;
    match: any,
    saveEvent: (event: Event) => void;
    changeSelection: (selection: IEventSelect) => void;
    toggleProgress: () => void;
    setTitle: (title: string) => void;
}

export class EventsPageRouter extends React.Component<IProps, {}> {

    public componentWillMount() {

        this.props.load();
    }

    private renderEditor = (props: any) => {
        return (<EditPage {...props}
            {...props}
            createInit={this.props.createInit}
            edit={this.props.editEvent}
            formTitle={"Post new event"}
            event={this.props.events.selection}
            save={this.props.saveEvent}
            changeSelection={this.props.changeSelection}
            toggleProgress={this.props.toggleProgress}
        />)
    }

    private renderCreator = (props: any) => {
        return (<EditPage {...props}
            {...props}
            createInit={this.props.createInit}
            edit={this.props.editEvent}
            formTitle={"Post new event"}
            event={this.props.events.selection}
            save={this.props.saveEvent}
            changeSelection={this.props.changeSelection}
            toggleProgress={this.props.toggleProgress}
            setTitle={this.props.setTitle}
        />)
    }

    private renderDetails = (props: any) => {
        return (
            <Details
                {...props}
                event={this.props.events.selection}
                toggleProgress={this.props.toggleProgress}
                changeSelection={this.props.changeSelection}
                setTitle={this.props.setTitle}
            />
        );
    }

    private renderList = (props: any) => {
        return (<ListPage
            {...props}
            events={this.props.events.items.sortBy(x => x.date).toList()}
            toggleProgress={this.props.toggleProgress}
            setTitle={this.props.setTitle}
        />);
    }

    public render(): JSX.Element {
        return (

            <Switch>
                <Route path="/" exact={true} render={this.renderList} />
                <Route path="/events" exact={true} render={this.renderList} />
                <Route path="/events/details/:id" render={this.renderDetails} />
                <Route path="/events/edit/:id" render={this.renderEditor} />
                <Route path="/events/create" render={this.renderCreator} />
            </Switch>
        );
    }

}