import { App, PreloadData } from '../app';
import { AppController } from './controller';
export { injectLoader } from './controller';
export declare function render(app: App, container: Node, preloadData?: PreloadData): AppController;
export declare function bootstrap(app: App, callback: (controller?: AppController) => void): void;
