import { App, PreloadData } from '../app';
import { AppController } from './controller';
import { ClientSideErrorHandler } from './view';
export declare function render<L>(app: App<L>, container: Element, loader: L, errorHandler: ClientSideErrorHandler, preloadData?: PreloadData): AppController<L>;
export declare function bootstrap<L>(app: App<L>, loader: L, errorHandler: ClientSideErrorHandler, callback: (controller: AppController<L>) => void): void;
