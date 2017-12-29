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
    didCommitState(state: AppState): void;
}
export declare class AppController {
    app: App;
    private _priv;
    constructor(app: App, history: History);
    start(preloadData?: PreloadData): void;
    load(uri: ParsedURI): void;
    subscribe(delegate: AppControllerDelegate): void;
    getLoader(): Loader;
}
