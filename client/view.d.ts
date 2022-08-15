import * as React from 'react';
import { DataUpdater } from '../app';
import { AppState, AppController } from './controller';
export declare type ErrorHandlerProps = {
    error: any;
};
export declare type ClientSideErrorHandler = {
    component: React.ComponentType<ErrorHandlerProps>;
    renderTitle?: (error: any) => string;
};
export declare class AppView<L> {
    private controller;
    private container;
    private errorHandler;
    state: AppState | null;
    ancestorStates: AppState[];
    constructor(controller: AppController<L>, container: Element, errorHandler: ClientSideErrorHandler);
    setState(state: AppState, ancestorStates: AppState[]): void;
    _render(): void;
    writeData(state: AppState, updater: DataUpdater<any>): void;
    _onScrollChange(x: number, y: number): void;
}
