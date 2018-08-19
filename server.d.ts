/// <reference types="react" />
import * as React from 'react';
import { App, WireObject, PreloadData, Loader } from './app';
export declare type ServerRequest = {
    url: string;
    path: string;
    query: {
        [key: string]: string;
    };
};
export declare type RenderResult = {
    preloadData: PreloadData;
    title: string;
    meta: WireObject;
    errorStatus?: number;
    redirectURI?: string;
    element?: React.ReactElement<any>;
    getHTML(): string;
};
export declare function injectLoaderFactory(loaderFactory: (serverRequest: ServerRequest) => Loader): void;
export declare function render(app: App, serverRequest: ServerRequest): Promise<RenderResult>;
