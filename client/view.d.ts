import { DataUpdater } from '../app';
import { AppState, AppController } from './controller';
export declare class AppView<L> {
    controller: AppController<L>;
    container: Element;
    state: AppState | null;
    ancestorStates: AppState[];
    constructor(controller: AppController<L>, container: Element);
    setState(state: AppState, ancestorStates: AppState[]): void;
    _render(): void;
    writeData(state: AppState, updater: DataUpdater<any>): void;
    _onScrollChange(x: number, y: number): void;
}
