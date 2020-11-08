/// <reference types="react" />
import * as React from 'react';
import { RouteComponent, RouteComponentProps } from './app';
import { AppController } from './client/controller';
export declare class ControllerProvider extends React.Component<any> {
    static childContextTypes: {
        controller: any;
    };
    render(): React.ReactElement<any>;
    getChildContext(): {
        controller: any;
    };
}
export interface LinkProps {
    to: string;
    queryParams?: {
        [key: string]: any;
    };
    onClick?: any;
    target?: string;
    stacked?: boolean;
    returnToParent?: boolean;
}
export declare function Link(props: LinkProps & React.AnchorHTMLAttributes<any>, context: {
    controller?: AppController;
}): JSX.Element;
export declare function createRouteElement<D>(component: RouteComponent<D> | undefined | null, props: RouteComponentProps<D>): React.ReactElement<any>;
