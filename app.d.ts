/// <reference types="react" />
import { AppController } from './client/controller';
export declare type Route = {
    regexp: RegExp;
    keys: any[];
    handler: RouteHandler<any>;
};
export declare type WireObject = {
    [key: string]: any;
};
export declare type RouteComponentProps<D> = {
    controller?: AppController;
    data: D;
    writeData: (updater: DataUpdater<D>) => void;
    loader: Loader;
};
export declare type RouteComponent<D> = React.ComponentType<RouteComponentProps<D>>;
export declare type Response<D> = D | Redirect;
export declare type RouteHandler<D> = {
    component?: RouteComponent<D>;
    load?: (request: Request) => Promise<Response<D>>;
    renderTitle?: (data: D) => string;
    renderMeta?: (data: D) => WireObject;
};
export declare type ParsedURI = {
    path: string;
    query: {
        [key: string]: any;
    };
};
export declare type RouteMatch = {
    handler: RouteHandler<any>;
    params: {
        [key: string]: any;
    };
};
export declare type Loader = any;
export declare type RedirectOptions = {
    stacked?: boolean;
};
export declare class Redirect {
    uri: string;
    options: RedirectOptions;
    constructor(uri: string | ParsedURI, options?: RedirectOptions);
}
export declare function isRedirect(obj: any): obj is Redirect;
export declare type BaseRequest = {
    app: App;
    loader: Loader;
    uri: string;
    path: string;
    query: {
        [key: string]: any;
    };
    params: {
        [key: string]: any;
    };
    stacked?: boolean;
};
export declare type Request = BaseRequest & {
    redirect: (uri: string | ParsedURI, options?: RedirectOptions) => Promise<Redirect>;
};
export declare function createRequest(base: BaseRequest): Request;
export declare type PreloadData = WireObject;
export declare class App {
    routes: Route[];
    defaultHandler: RouteHandler<any>;
    title: string | ((routeTitle?: string) => string);
    constructor();
    route<D>(path: string, handler: RouteHandler<D>): void;
}
export declare function createApp(): App;
export declare function matchRoute(app: App, uri: ParsedURI): RouteMatch;
export declare function renderTitle<D>(app: App, handler: RouteHandler<D>, data: D): string;
export declare type DataUpdater<D> = (data: D) => void;
