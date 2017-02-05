export declare class Router {
    private window;
    private previous;
    private routes;
    constructor(window: Window);
    hash(path: string, callback: () => void): void;
    hashpath(): string;
    start(): void;
    stop(): void;
    private onHashChanged();
    dispatch(path: string): void;
}
