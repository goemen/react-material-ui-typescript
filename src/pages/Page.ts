import * as React from 'react';

interface IPageProps {
    setTitle: (title: string) => void;
}

export class Page<P extends IPageProps, S> extends React.Component<P, S> {
    public title: string = process.env.REACT_APP_APPNAME;

    public componentWillMount() {
        this.props.setTitle(this.title);
    }

    public componentDidMount() {

    }

    public setTitle = (title: string) => {
        this.props.setTitle(title);
    }
}