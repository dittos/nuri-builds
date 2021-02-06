import * as React from 'react';
import { RouteComponent, RouteComponentProps } from './app';
import { AppController } from './client/controller';
export declare const ControllerContext: React.Context<AppController<any> | undefined>;
export interface LinkProps {
    to: string;
    queryParams?: {
        [key: string]: any;
    };
    onClick?: React.MouseEventHandler;
    target?: string;
    stacked?: boolean;
    returnToParent?: boolean;
}
export declare function Link(props: LinkProps & React.AnchorHTMLAttributes<any>): JSX.Element;
export declare function createRouteElement<D, L>(component: RouteComponent<D, L> | undefined | null, props: RouteComponentProps<D, L>): React.ReactElement<any>;
