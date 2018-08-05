import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
export declare type Location = {
    uri: string;
    token: string | null;
};
export interface History {
    getLocation(): Location;
    setHistoryToken(token: string): void;
    locationChanges(): Observable<Location>;
    pushLocation(location: Location): void;
    doesPushLocationRefreshPage(): boolean;
    back(): void;
    replaceLocation(location: Location): void;
}
export declare function createHistory(): History;
export declare class BrowserHistory implements History {
    locationChanges(): Observable<{
        uri: string;
        token: any;
    }>;
    getLocation(): {
        uri: string;
        token: any;
    };
    setHistoryToken(token: string): void;
    pushLocation({token, uri}: Location): void;
    replaceLocation({token, uri}: Location): void;
    doesPushLocationRefreshPage(): boolean;
    back(): void;
}
export declare class FallbackHistory implements History {
    getLocation(): {
        uri: string;
        token: null;
    };
    setHistoryToken(token: string): void;
    locationChanges(): Observable<Location>;
    pushLocation({uri}: Location): void;
    doesPushLocationRefreshPage(): boolean;
    replaceLocation({uri}: Location): void;
    back(): void;
}
