import { App, PreloadData, WireObject, RouteHandler, ParsedURI } from '../app';
import { History } from './history';
export declare type AppState = {
    scrollX?: number;
    scrollY?: number;
} & ({
    status: 'ok';
    handler: RouteHandler<any, any>;
    data: WireObject;
} | {
    status: 'error';
    error: any;
});
export interface AppControllerDelegate {
    willLoad(): void;
    didLoad(): void;
    didAbortLoad(): void;
    didCommitState(state: AppState, ancestorStates: AppState[]): void;
}
export declare class AppController<L> {
    app: App<L>;
    private history;
    private loader;
    private navigationController;
    private delegates;
    constructor(app: App<L>, history: History, loader: L);
    start(preloadData?: PreloadData): void;
    load(uri: ParsedURI | string, options?: {
        stacked: boolean;
        returnToParent: boolean;
    }): void;
    subscribe(delegate: AppControllerDelegate): void;
    getLoader(): L;
    private loadState;
    private loadStateFromMatch;
    private matchRoute;
}
