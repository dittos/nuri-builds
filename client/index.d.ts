import { App, PreloadData } from '../app';
import { AppController } from './controller';
export declare function render<L>(app: App<L>, container: Element, loader: L, preloadData?: PreloadData): AppController<L>;
export declare function onPreloadDataReady(callback: (preloadData: any) => void): void;
export declare function bootstrap<L>(app: App<L>, loader: L, callback: (controller: AppController<L>) => void): void;
