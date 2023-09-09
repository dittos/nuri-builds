import * as React from 'react';
import { App, WireObject, PreloadData } from './app';
export interface ServerRequest {
    url: string;
    path: string;
    query: {
        [key: string]: string;
    };
}
export declare type RenderResult = {
    preloadData: PreloadData;
    title: string;
    meta: WireObject;
    redirectURI?: string;
    element?: React.ReactElement<any>;
    getHTML(): string;
};
export declare function render<L>(app: App<L>, serverRequest: ServerRequest, loader: L): Promise<RenderResult>;
