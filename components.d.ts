import * as React from 'react';
import { RouteComponent, RouteComponentProps } from './app';
import { AppController } from './client/controller';
export declare const ControllerContext: React.Context<AppController | undefined>;
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
export declare function Link(props: LinkProps & React.AnchorHTMLAttributes<any>): JSX.Element;
export declare function createRouteElement<D>(component: RouteComponent<D> | undefined | null, props: RouteComponentProps<D>): React.ReactElement<any>;
