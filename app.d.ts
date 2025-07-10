/// <reference types="react" />
import { AppController } from './client/controller';
export declare type Route<L> = {
    regexp: RegExp;
    keys: any[];
    handler: RouteHandler<any, L>;
};
export declare type LazyRoute<L> = {
    regexp: RegExp;
    keys: any[];
    handler: LazyRouteHandler<any, L>;
};
export declare type WireObject = {
    [key: string]: any;
};
export declare type RouteComponentProps<D, L> = {
    controller?: AppController<L>;
    data: D;
    writeData: (updater: DataUpdater<D>) => void;
    loader: L;
};
export declare type RouteComponent<D, L> = React.ComponentType<RouteComponentProps<D, L>>;
export declare type Response<D> = D | Redirect | NotFound;
export declare type RouteHandler<D, L> = {
    component?: RouteComponent<D, L>;
    load?: (request: Request<L>) => Promise<Response<D>>;
    renderTitle?: (data: D) => string;
    renderMeta?: (data: D) => WireObject;
};
export declare type LazyRouteHandler<D, L> = () => Promise<RouteHandler<D, L>>;
export declare type ParsedURI = {
    path: string;
    query: {
        [key: string]: any;
    };
};
export declare type RouteMatch<L> = {
    handler: RouteHandler<any, L>;
    params: {
        [key: string]: any;
    };
};
export declare type LazyRouteMatch<L> = {
    handler: LazyRouteHandler<any, L>;
    params: {
        [key: string]: any;
    };
};
export declare type RedirectOptions = {
    stacked?: boolean;
};
export declare class Redirect {
    uri: string;
    options: RedirectOptions;
    constructor(uri: string | ParsedURI, options?: RedirectOptions);
}
export declare function isRedirect(obj: any): obj is Redirect;
export declare class NotFound {
}
export declare function isNotFound(obj: any): obj is NotFound;
export declare type BaseRequest<L> = {
    loader: L;
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
export declare type Request<L> = BaseRequest<L> & {
    redirect: (uri: string | ParsedURI, options?: RedirectOptions) => Promise<Redirect>;
    notFound: () => Promise<NotFound>;
};
export declare function createRequest<L>(base: BaseRequest<L>): Request<L>;
export declare type PreloadData = WireObject;
export declare class App<L> {
    routes: Route<L>[];
    lazyRoutes: LazyRoute<L>[];
    title: string | ((routeTitle?: string) => string);
    constructor();
    route<D>(path: string, handler: RouteHandler<D, L>): void;
    lazyRoute<D>(path: string, handler: () => Promise<RouteHandler<D, L>>): void;
}
export declare function createApp<L>(): App<L>;
export declare function matchRoute<L>(app: App<L>, uri: ParsedURI): RouteMatch<L> | null;
export declare function matchLazyRoute<L>(app: App<L>, uri: ParsedURI): LazyRouteMatch<L> | null;
export declare function renderTitle<D, L>(app: App<L>, handler: RouteHandler<D, L>, data: D): string;
export declare function applyAppTitle(app: App<any>, routeTitle: string): string;
export declare type DataUpdater<D> = (data: D) => void;
