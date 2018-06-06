import * as React from 'react';

interface ILoginProps {
    login?: (data: any) => void;
    classes?: any;
}

export class LoginPage extends React.Component<ILoginProps, {}> {

    public render(): JSX.Element {
        return (
            <h2>
                Login Page
            </h2>
        );
    }
}

