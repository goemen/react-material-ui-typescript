import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../state/User';

interface IPageProps {
    setTitle: (title: string) => void;
    auth?: User;
    alert?: (title: string, message: string, buttons: IAlertButtonOptions[], contents?: React.ComponentType, options?: any) => void;
    dismissAlert?: () => void;
    history: any;
}

export interface IAlertButtonOptions {
    label: string;
    primary?: boolean;
    handler: () => void;
}

export class Page<P extends IPageProps, S> extends React.Component<P, S> {
    public title: string = process.env.REACT_APP_APPNAME;
    public user = firebase.auth().currentUser;
    
    public componentWillMount() {
        this.props.setTitle(this.title);
    }

    public getUser(): User {
        return this.props.auth;
    }

    public setTitle = (title: string) => {
        this.props.setTitle(title);
    }

    public alert(title: string, message: string, buttons: IAlertButtonOptions[], contents?: React.ComponentType, options?: any) {
        if (this.props.alert) {
            this.props.alert(title, message, buttons, contents, options);
        } else {
            alert(message);
        }
    }

    public error(message: string) {
        this.alert('Whoops!', message, [
            {label: 'Dismiss', handler: () => this.dismissAlert()}
        ])
    }

    public dismissAlert() {
        if (this.props.dismissAlert) {
            this.props.dismissAlert();
        } 
    }

    public goto(path: string) {
        this.props.history.push(path);
    }
}