import { Observable } from 'rxjs';
import { Redirect } from '../app';
import { History } from './history';
export declare type NavigationEntry<T> = {
    uri: string;
    token: string;
    state: T;
    isRedirect: boolean;
    parentToken: string | null;
};
export interface LoadRequest {
    uri: string;
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
    private entryTokens;
    private currentEntry;
    private started;
    private loadSubscription;
    constructor(delegate: NavigationControllerDelegate<T>, stateLoader: StateLoader<T>, history: History);
    start(preloadState?: T): void;
    push(uri: string, options?: {
        stacked: boolean;
    }): void;
    hasParent(): boolean;
    returnToParent(): void;
    private pop;
    private abortLoad;
    private navigate;
    private load;
    private commit;
    private getAncestorStates;
    private pruneOldEntries;
}
