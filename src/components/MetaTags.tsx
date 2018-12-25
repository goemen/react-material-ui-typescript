import * as React from 'react';
const MetaTags = require('react-meta-tags').default;

interface IAppMetaTags {
    title: string;
}
export class AppMetaTags extends React.Component<IAppMetaTags> {
    public render(): JSX.Element {
        return (
            <MetaTags>
                <title>{ `${process.env.REACT_APP_APPNAME} - ${this.props.title}`}</title>
            </MetaTags>
        );
    }
}