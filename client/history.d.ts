/// <reference types="node" />
import * as querystring from 'querystring';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ParsedURI } from '../app';
export declare type Location = {
    uri: ParsedURI;
    token: string | null;
};
export interface History {
    getLocation(): Location;
    setHistoryToken(token: string): void;
    locationChanges(): Observable<Location>;
    pushLocation(location: Location): void;
    doesPushLocationRefreshPage(): boolean;
    back(): void;
}
export declare function createHistory(): History;
export declare class BrowserHistory implements History {
    locationChanges(): Observable<{
        uri: {
            path: string;
            query: querystring.ParsedUrlQuery;
        };
        token: any;
    }>;
    getLocation(): {
        uri: {
            path: string;
            query: querystring.ParsedUrlQuery;
        };
        token: any;
    };
    setHistoryToken(token: string): void;
    pushLocation({token, uri}: Location): void;
    doesPushLocationRefreshPage(): boolean;
    back(): void;
}
export declare class FallbackHistory implements History {
    getLocation(): {
        uri: {
            path: string;
            query: querystring.ParsedUrlQuery;
        };
        token: null;
    };
    setHistoryToken(token: string): void;
    locationChanges(): Observable<Location>;
    pushLocation({uri}: Location): void;
    doesPushLocationRefreshPage(): boolean;
    back(): void;
}
