/// <reference types="react" />
export declare type Route = {
    regexp: RegExp;
    keys: any[];
    handler: RouteHandler;
};
export declare type WireObject = {
    [key: string]: any;
};
export declare type RouteComponent = React.ComponentType<any>;
export declare type Response = WireObject | Redirect;
export declare type RouteHandler = {
    component?: RouteComponent;
    load?: (request: Request) => Promise<Response>;
    renderTitle?: (data: WireObject) => string;
    renderMeta?: (data: WireObject) => WireObject;
};
export declare type ParsedURI = {
    path: string;
    query: {
        [key: string]: any;
    };
};
export declare type RouteMatch = {
    handler: RouteHandler;
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
export declare function isRedirect(obj: any): boolean;
export declare type BaseRequest = {
    app: App;
    loader: Loader;
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
    defaultHandler: RouteHandler;
    title: string | ((routeTitle?: string) => string);
    constructor();
    route(path: string, handler: RouteHandler): void;
}
export declare function createApp(): App;
export declare function matchRoute(app: App, uri: ParsedURI): RouteMatch;
export declare function renderTitle(app: App, handler: RouteHandler, data: WireObject): string;
export declare type DataUpdater = (data: WireObject) => void;
