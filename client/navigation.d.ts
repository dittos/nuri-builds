import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Redirect } from '../app';
import { ParsedURI } from '../app';
import { History } from './history';
export declare type NavigationEntry<T> = {
    uri: ParsedURI;
    token: string;
    state: T;
    isRedirect: boolean;
    parentToken: string | null;
};
export interface LoadRequest {
    uri: ParsedURI;
    stacked: boolean;
}
export declare type LoadResult<T> = T | Redirect;
export interface NavigationControllerDelegate<T> {
    willLoad(): void;
    didLoad(): void;
    didAbortLoad(): void;
    didCommitLoad(state: T, ancestorStates: T[]): void;
}
export declare type StateLoader<T> = (request: LoadRequest) => Observable<LoadResult<T>>;
export declare class NavigationController<T> {
    private delegate;
    private stateLoader;
    private history;
    private entries;
    private currentEntry;
    private started;
    private loadSubscription;
    constructor(delegate: NavigationControllerDelegate<T>, stateLoader: StateLoader<T>, history: History);
    start(preloadState?: T): void;
    push(uri: ParsedURI, options?: {
        stacked: boolean;
    }): void;
    hasParent(): boolean;
    returnToParent(): void;
    private pop(location);
    private abortLoad();
    private navigate(type, uri, token, parentToken?);
    private load(uri, token, parentToken, isRedirect?);
    private commit(type, entry);
    private getAncestorStates();
}
