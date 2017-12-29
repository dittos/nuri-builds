import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Redirect } from '../app';
import { ParsedURI } from '../app';
import { Location } from './history';
export declare type NavigationEntry<T> = {
    uri: ParsedURI;
    token: string;
    state: T;
    isRedirect: boolean;
};
export declare type NavigationType = 'replace' | 'push' | 'pop';
export declare type LoadResult<T> = T | Redirect;
export interface NavigationControllerDelegate<T> {
    willLoad(): void;
    didLoad(): void;
    didAbortLoad(): void;
    didCommitLoad(type: NavigationType, entry: NavigationEntry<T>): void;
    loadState(uri: ParsedURI): Observable<LoadResult<T>>;
}
export declare class NavigationController<T> {
    delegate: NavigationControllerDelegate<T>;
    entries: {
        [token: string]: NavigationEntry<T>;
    };
    currentEntry: NavigationEntry<T> | null;
    started: boolean;
    loadSubscription: Subscription;
    constructor(delegate: NavigationControllerDelegate<T>);
    start({uri, token}: Location, preloadState?: T): void;
    push(uri: ParsedURI): void;
    pop(location: Location): void;
    _abortLoad(): void;
    _navigate(type: NavigationType, uri: ParsedURI, token: string): void;
    _load(uri: ParsedURI, token: string, isRedirect?: boolean): Observable<NavigationEntry<T>>;
    _commit(type: NavigationType, entry: NavigationEntry<T>): void;
}
