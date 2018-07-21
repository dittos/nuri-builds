import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { App, PreloadData, Loader, WireObject, RouteHandler, ParsedURI } from '../app';
import { History } from './history';
export declare function injectLoader(loader: Loader): void;
export declare type AppState = {
    handler: RouteHandler;
    data: WireObject;
    scrollX?: number;
    scrollY?: number;
};
export interface AppControllerDelegate {
    willLoad(): void;
    didLoad(): void;
    didAbortLoad(): void;
    didCommitState(state: AppState, ancestorStates: AppState[]): void;
}
export declare class AppController {
    app: App;
    private history;
    private navigationController;
    private delegates;
    constructor(app: App, history: History);
    start(preloadData?: PreloadData): void;
    load(uri: ParsedURI, options?: {
        stacked: boolean;
        returnToParent: boolean;
    }): void;
    subscribe(delegate: AppControllerDelegate): void;
    getLoader(): Loader;
    private loadState;
    private matchRoute(uri);
}
