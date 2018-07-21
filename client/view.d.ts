import { DataUpdater } from '../app';
import { AppState, AppController } from './controller';
export declare class AppView {
    controller: AppController;
    container: Node;
    state: AppState | null;
    ancestorStates: AppState[];
    constructor(controller: AppController, container: Node);
    setState(state: AppState | null, ancestorStates: AppState[]): void;
    _render(): void;
    writeData(state: AppState, updater: DataUpdater): void;
    _onScrollChange(x: number, y: number): void;
}
