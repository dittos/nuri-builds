/// <reference types="react" />
import * as React from 'react';
import { DataUpdater, WireObject, RouteComponent, Loader } from './app';
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
export declare function createRouteElement(component: RouteComponent | undefined | null, props: {
    controller?: AppController;
    data: WireObject;
    writeData: (updater: DataUpdater) => void;
    loader: Loader;
}): React.ReactElement<any>;
